import { useState, useEffect } from 'react';
import { ArrowLeft, Receipt, Calendar, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  date: string;
}

interface OrderHistoryProps {
  onBack: () => void;
}

export function OrderHistory({ onBack }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    setOrders(history);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white min-w-[1440px]">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#3a3a3a] rounded-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Menu</span>
          </button>
        </div>
        <h1 className="text-xl">Order History</h1>
        <div className="w-32"></div>
      </div>

      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-[#2a2a2a] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl mb-2">No Orders Yet</h2>
            <p className="text-gray-400">
              You haven't placed any orders yet.
              <br />
              Start ordering to see your history here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders List */}
            <div className="space-y-4">
              <h2 className="text-lg mb-4">All Orders ({orders.length})</h2>
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-[#2a2a2a] rounded-xl p-4 cursor-pointer transition-all ${
                    selectedOrder?.id === order.id ? 'ring-2 ring-[#b4f4d9]' : 'hover:bg-[#3a3a3a]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#3a3a3a] p-2 rounded-lg">
                        <Receipt className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{order.customerName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(order.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl">${order.total}</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div>
              {selectedOrder ? (
                <div className="bg-[#2a2a2a] rounded-xl p-6 sticky top-6">
                  <h2 className="text-lg mb-4">Order Details</h2>
                  
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <div className="flex items-center gap-2 text-gray-300 mb-2">
                      <User className="w-4 h-4" />
                      <span>Customer: {selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedOrder.date)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-${
                            item.image === 'pizza'
                              ? '1565299624946-b28f40a0ae38'
                              : item.image === 'burger'
                              ? '1568901346375-23c9450c58cd'
                              : item.image === 'wings'
                              ? '1608039829572-78524f79c4c7'
                              : '1512621776951-a57141f2eefd'
                          }?w=200&h=200&fit=crop`}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div>{item.name}</div>
                          <div className="text-sm text-gray-400">
                            Quantity: {item.quantity}
                          </div>
                        </div>
                        <div>${item.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-xl">
                      <span>Total</span>
                      <span>${selectedOrder.total}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#2a2a2a] rounded-xl p-12 flex items-center justify-center h-64">
                  <p className="text-gray-400 text-center">
                    Select an order to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
