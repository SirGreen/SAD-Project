import { useState } from 'react';
import { X, Minus, Plus, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CheckoutModalProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onConfirm: (customerName: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export function CheckoutModal({ cart, total, onClose, onConfirm, onUpdateQuantity }: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState('');

  const handleConfirm = () => {
    if (customerName.trim()) {
      onConfirm(customerName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-xl">
                <Utensils className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900">Confirm your order</h2>
                <p className="text-sm text-gray-500">Recheck what you ordered</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Customer Name Input */}
          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Your Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Olivia Rhye"
              className="w-full px-4 py-3 border-2 border-blue-500 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Order History Section */}
          <div className="mb-6">
            <div className="text-center text-sm text-gray-700 mb-3">Order History</div>
            <div className="bg-[#2a2a2a] rounded-xl p-4 space-y-4">
              {cart.map((item) => (
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
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-white mb-2">{item.name}</div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-white">${item.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 text-gray-900">
            <span className="text-lg">Total</span>
            <span className="text-lg">${total}</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!customerName.trim()}
              className="px-6 py-3 bg-[#e85d4e] text-white rounded-xl hover:bg-[#d94d3e] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
