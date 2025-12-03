import { useState } from 'react';
import { Menu, Clock, Search, Phone, ShoppingCart, Receipt, User, Minus, Plus, List } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { DishDetailModal } from './DishDetailModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SuccessModal } from './SuccessModal';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const categories = [
  { id: 'pizza', name: 'Pizza', color: 'bg-[#b4f4d9]' },
  { id: 'burger', name: 'Burger', color: 'bg-[#e4b4f4]' },
  { id: 'fries', name: 'Fries', color: 'bg-[#b4f4d9]' },
  { id: 'beverages', name: 'Beverages', color: 'bg-[#e4b4f4]' },
  { id: 'wings', name: 'Wings', color: 'bg-[#f4b4e4]' },
  { id: 'sandwiches', name: 'Sandwiches & Wraps', color: 'bg-[#b4f4d9]' },
  { id: 'salads', name: 'Salads', color: 'bg-[#f4b4e4]' },
  { id: 'icecream', name: 'Ice Cream', color: 'bg-[#b4f4d9]' },
];

const menuItems: MenuItem[] = [
  { id: '1', name: 'Cheese Pizza', price: 320, image: 'pizza', category: 'pizza' },
  { id: '2', name: 'Hamburger', price: 320, image: 'burger', category: 'burger' },
  { id: '3', name: 'Chicken Wings', price: 320, image: 'wings', category: 'wings' },
  { id: '4', name: 'Salad', price: 320, image: 'salad', category: 'salads' },
  { id: '5', name: 'Cheeseburger', price: 350, image: 'burger', category: 'burger' },
  { id: '6', name: 'Pepperoni Pizza', price: 380, image: 'pizza', category: 'pizza' },
  { id: '7', name: 'Veggie Pizza', price: 340, image: 'pizza', category: 'pizza' },
  { id: '8', name: 'BBQ Wings', price: 280, image: 'wings', category: 'wings' },
  { id: '9', name: 'Margherita Pizza', price: 300, image: 'pizza', category: 'pizza' },
  { id: '10', name: 'Caesar Salad', price: 250, image: 'salad', category: 'salads' },
  { id: '11', name: 'Double Burger', price: 420, image: 'burger', category: 'burger' },
  { id: '12', name: 'Buffalo Wings', price: 300, image: 'wings', category: 'wings' },
  { id: '13', name: 'Hawaiian Pizza', price: 360, image: 'pizza', category: 'pizza' },
  { id: '14', name: 'Bacon Burger', price: 380, image: 'burger', category: 'burger' },
  { id: '15', name: 'Greek Salad', price: 270, image: 'salad', category: 'salads' },
  { id: '16', name: 'Garlic Wings', price: 290, image: 'wings', category: 'wings' },
  { id: '17', name: 'Meat Lover Pizza', price: 450, image: 'pizza', category: 'pizza' },
  { id: '18', name: 'Veggie Burger', price: 310, image: 'burger', category: 'burger' },
  { id: '19', name: 'Spicy Wings', price: 310, image: 'wings', category: 'wings' },
  { id: '20', name: 'Garden Salad', price: 240, image: 'salad', category: 'salads' },
  { id: '21', name: 'Supreme Pizza', price: 480, image: 'pizza', category: 'pizza' },
  { id: '22', name: 'Chicken Burger', price: 340, image: 'burger', category: 'burger' },
  { id: '23', name: 'Honey Mustard Wings', price: 320, image: 'wings', category: 'wings' },
  { id: '24', name: 'Cobb Salad', price: 290, image: 'salad', category: 'salads' },
  { id: '25', name: 'Four Cheese Pizza', price: 410, image: 'pizza', category: 'pizza' },
  { id: '26', name: 'Fish Burger', price: 360, image: 'burger', category: 'burger' },
  { id: '27', name: 'Teriyaki Wings', price: 330, image: 'wings', category: 'wings' },
  { id: '28', name: 'Caprese Salad', price: 280, image: 'salad', category: 'salads' },
  { id: '29', name: 'Seafood Pizza', price: 490, image: 'pizza', category: 'pizza' },
  { id: '30', name: 'Mushroom Burger', price: 330, image: 'burger', category: 'burger' },
  { id: '31', name: 'Lemon Pepper Wings', price: 300, image: 'wings', category: 'wings' },
  { id: '32', name: 'Spinach Salad', price: 260, image: 'salad', category: 'salads' },
  { id: '33', name: 'White Pizza', price: 370, image: 'pizza', category: 'pizza' },
  { id: '34', name: 'Pulled Pork Burger', price: 390, image: 'burger', category: 'burger' },
  { id: '35', name: 'Thai Chili Wings', price: 340, image: 'wings', category: 'wings' },
  { id: '36', name: 'Taco Salad', price: 310, image: 'salad', category: 'salads' },
];

interface MenuViewProps {
  onViewHistory: () => void;
}

export function MenuView({ onViewHistory }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('pizza');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [showDishDetail, setShowDishDetail] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ customerName: string, orderId: string, total: number }>({ customerName: '', orderId: '', total: 0 });

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      );
      return updated.filter((item) => item.quantity > 0);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = (name: string) => {
    // Save order to history
    const orderId = '#' + Date.now().toString().slice(-4);
    const order = {
      id: Date.now().toString(),
      customerName: name,
      items: cart,
      total: total,
      date: new Date().toISOString(),
    };
    
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    localStorage.setItem('orderHistory', JSON.stringify([order, ...history]));
    
    // Show success modal
    setLastOrder({ customerName: name, orderId: orderId, total: total });
    setShowCheckout(false);
    setShowSuccess(true);
    
    // Reset cart
    setCart([]);
    setCustomerName('');
  };

  // Filter menu items by selected category
  const filteredMenuItems = menuItems.filter((item) => {
    if (!selectedCategory) return true;
    
    // Check if item's category matches OR if item's name contains the category name
    const categoryName = categories.find(c => c.id === selectedCategory)?.name.toLowerCase() || '';
    const itemNameLower = item.name.toLowerCase();
    
    return item.category === selectedCategory || itemNameLower.includes(categoryName);
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white min-w-[1440px]">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#3a3a3a] rounded">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-5 h-5" />
            <span>07h:33m</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-[#3a3a3a] rounded">
            <Search className="w-5 h-5" />
          </button>
          <button className="bg-[#3a3a3a] px-4 py-2 rounded-lg flex items-center gap-2">
            <span>Online Order</span>
            <span className="bg-[#b4f4d9] text-black w-6 h-6 rounded-full flex items-center justify-center">
              8
            </span>
          </button>
          <button className="bg-[#3a3a3a] px-4 py-2 rounded-lg">POS Order</button>
          <button className="bg-[#b4f4d9] text-black px-4 py-2 rounded-lg">Dine in</button>
          <button className="bg-[#d97979] px-4 py-2 rounded-lg flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <div className="flex flex-col items-start">
              <span className="text-xs">Call for Support</span>
              <span className="text-xs">123-456-7890</span>
            </div>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8 mr-[480px]">
          {/* Categories */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${category.color} text-black px-8 py-8 rounded-2xl text-lg relative ${
                  selectedCategory === category.id ? 'ring-2 ring-white' : ''
                }`}
              >
                {selectedCategory === category.id && (
                  <div className="absolute top-3 right-3 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                )}
                {category.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8">
            {/* Menu Items Grid */}
            <div className="grid grid-cols-3 gap-5">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2a2a2a] rounded-xl p-5 flex items-center gap-5"
                >
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
                    <div className="text-base text-gray-300">{item.name}</div>
                    <div className="text-base">${item.price}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedDish(item);
                        setShowDishDetail(true);
                      }}
                      className="bg-[#7d5fb5] p-2 rounded-lg hover:bg-[#8d6fc5]"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-[#7d5fb5] p-2 rounded-lg hover:bg-[#8d6fc5]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Cart */}
        <div className="w-[480px] bg-[#2a2a2a] flex flex-col fixed right-0 top-[60px] bottom-[25vh]">
          <div className="p-6 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#3a3a3a] p-2 rounded">
                  <Receipt className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-300">No: #032</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[#3a3a3a] px-4 py-2 rounded-lg flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Walk-in Customer {'>'}</span>
                </button>
                <button 
                  onClick={onViewHistory}
                  className="bg-[#3a3a3a] p-2 rounded-lg hover:bg-[#4a4a4a]"
                >
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Items - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-[#3a3a3a] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <ShoppingCart className="w-12 h-12" />
                  <div className="absolute -top-1 -right-1 bg-[#7d5fb5] w-7 h-7 rounded-full flex items-center justify-center text-sm">
                    0
                  </div>
                </div>
                <div className="text-2xl mb-3">Nothing In Cart</div>
                <div className="text-base text-gray-400">
                  Your cart is empty. Start adding items
                  <br />
                  to see them here.
                </div>
              </div>
            ) : (
              <div className="space-y-4 pb-4">
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
                      }?w=100&h=100&fit=crop`}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-base">{item.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-white text-black w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-base w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-white text-black w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-base">${item.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Fixed Bottom Section */}
          <div className="p-6 pt-5 pb-10 border-t border-gray-700 border-dashed flex-shrink-0">
            <div className="flex justify-between text-xl mb-5">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-5">
              <button className="bg-[#3a3a3a] p-3 rounded-lg flex flex-col items-center gap-1 text-xs hover:bg-[#4a4a4a]">
                <div className="w-7 h-7 flex items-center justify-center text-base">🔓</div>
                <span>No sale</span>
              </button>
              <button className="bg-[#3a3a3a] p-3 rounded-lg flex flex-col items-center gap-1 text-xs hover:bg-[#4a4a4a]">
                <div className="w-7 h-7 flex items-center justify-center text-base">%</div>
                <span>Discount</span>
              </button>
              <button className="bg-[#3a3a3a] p-3 rounded-lg flex flex-col items-center gap-1 text-xs hover:bg-[#4a4a4a]">
                <div className="w-7 h-7 flex items-center justify-center text-base">📝</div>
                <span>Notes</span>
              </button>
              <button className="bg-[#3a3a3a] p-3 rounded-lg flex flex-col items-center gap-1 text-xs hover:bg-[#4a4a4a]">
                <div className="w-7 h-7 flex items-center justify-center text-base">🧾</div>
                <span>Tax Red</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#3a3a3a] px-6 py-4 rounded-lg text-base hover:bg-[#4a4a4a]">
                Send
              </button>
              <button
                onClick={() => cart.length > 0 && setShowCheckout(true)}
                disabled={cart.length === 0}
                className="bg-white text-black px-6 py-4 rounded-lg text-base hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          total={total}
          onClose={() => setShowCheckout(false)}
          onConfirm={handleConfirmOrder}
          onUpdateQuantity={updateQuantity}
        />
      )}

      {/* Dish Detail Modal */}
      {showDishDetail && selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => {
            setShowDishDetail(false);
            setSelectedDish(null);
          }}
        />
      )}

      {/* Success Modal */}
      {showSuccess && lastOrder && (
        <SuccessModal
          customerName={lastOrder.customerName}
          orderId={lastOrder.orderId}
          total={lastOrder.total}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}