import { useState, useEffect } from 'react';
import { Menu, Clock, Search, Phone, ShoppingCart, Receipt, User, Minus, Plus, List } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { DishDetailModal } from './DishDetailModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SuccessModal } from './SuccessModal';
import { NotesModal } from './NotesModal';

interface ApiDish {
  id: number;
  name: string;
  price: number;
  isServing: boolean;
  imageUrl: string;
  category: string;
  detail?: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  apiCategory: string;
  uiCategory: string;
  isServing: boolean;
  detail?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const uiCategories = [
  { id: 'all', name: 'All Menu', color: 'bg-[#b4f4d9]' },
  { id: 'mains', name: 'Mains & Grill', color: 'bg-[#e4b4f4]' },
  { id: 'asian', name: 'Asian Bowls', color: 'bg-[#b4f4d9]' },
  { id: 'bites', name: 'Bites & Sandwiches', color: 'bg-[#f4b4e4]' },
  { id: 'greens', name: 'Healthy & Veg', color: 'bg-[#b4f4d9]' },
  { id: 'dessert', name: 'Desserts', color: 'bg-[#e4b4f4]' },
];

const mapCategoryToUi = (apiCategory: string): string => {
  const lowerCat = apiCategory.toLowerCase();

  if (['beef', 'pork', 'lamb', 'seafood'].includes(lowerCat)) return 'mains';
  if (['bowls', 'rice', 'noodles'].includes(lowerCat)) return 'asian';
  if (['small plates', 'sides', 'sandwiches'].includes(lowerCat)) return 'bites';
  if (['salads', 'vegetarian', 'plant-based'].includes(lowerCat)) return 'greens';
  if (['desserts'].includes(lowerCat)) return 'dessert';
  return 'all';
};

interface MenuViewProps {
  onViewHistory: () => void;
}

export function MenuView({ onViewHistory }: MenuViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [showDishDetail, setShowDishDetail] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ customerName: string, orderId: string, total: number }>({ customerName: '', orderId: '', total: 0 });
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5281/api/Dishes');

        if (!response.ok) {
          throw new Error('Failed to fetch dishes');
        }

        const dishes: ApiDish[] = await response.json();

        const transformedDishes: MenuItem[] = dishes.map((dish) => ({
          id: dish.id.toString(),
          name: dish.name,
          price: dish.price,
          image: dish.imageUrl,
          apiCategory: dish.category,
          uiCategory: mapCategoryToUi(dish.category),
          isServing: dish.isServing
        }));

        setMenuItems(transformedDishes);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

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

  const handleConfirmOrder = async (name: string) => {
    try {
      const orderRequest = {
        customerName: name,
        dishIds: cart.map(i => Number(i.id)),
        note: notes || null
      };

      console.log("Sending order request:", orderRequest);

      const res = await fetch("http://localhost:5281/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderRequest)
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Backend error:", errText);
        throw new Error("Create order failed");
      }

      const data = await res.json();
      console.log("Backend order response:", data);

      const order = {
        id: data.orderId,
        customerName: name,
        items: cart,
        total: total,
        date: new Date().toISOString(),
        notes: notes,
      };

      const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      localStorage.setItem('orderHistory', JSON.stringify([order, ...history]));

      setLastOrder({
        customerName: name,
        orderId: data.orderId,
        total: total
      });

      setShowCheckout(false);
      setShowSuccess(true);

      setCart([]);
      setCustomerName('');
      setNotes('');

    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed! Please try again.");
    }
  };

  const handleViewDetail = async (id: string) => {
    try {
      // Gọi API lấy chi tiết món ăn theo ID
      const res = await fetch(`http://localhost:5281/api/Dishes/${id}`);

      if (!res.ok) {
        throw new Error('Failed to fetch dish detail');
      }

      const data: ApiDish = await res.json();

      // Transform dữ liệu trả về để khớp với interface MenuItem
      const detailItem: MenuItem = {
        id: data.id.toString(),
        name: data.name,
        price: data.price,
        image: data.imageUrl,
        apiCategory: data.category,
        uiCategory: mapCategoryToUi(data.category),
        isServing: data.isServing,
        detail: data.detail // [QUAN TRỌNG] Map dữ liệu detail từ API vào đây
      };

      setSelectedDish(detailItem);
      setShowDishDetail(true);
    } catch (error) {
      console.error("Error fetching dish details:", error);
      alert("Could not load dish details");
    }
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.uiCategory === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white min-w-[1440px]">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#3a3a3a] rounded">
            <Menu lassName="w-6 h-6" />
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
          <div className="grid grid-cols-3 gap-5 mb-8">
            {uiCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${category.color} text-black px-8 py-8 rounded-2xl text-lg relative ${selectedCategory === category.id ? 'ring-2 ring-white' : ''
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
            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-400">Loading menu items...</div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#2a2a2a] rounded-xl p-5 flex items-center gap-5"
                  >
                    <ImageWithFallback
                      src={item.image.startsWith('http') ? item.image : `https://images.unsplash.com/photo-${item.image === 'pizza'
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
                        onClick={() => handleViewDetail(item.id)}
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
            )}
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
                      src={item.image.startsWith('http') ? item.image : `https://images.unsplash.com/photo-${item.image === 'pizza'
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
              <button
                onClick={() => setShowNotes(true)}
                className="bg-[#3a3a3a] p-3 rounded-lg flex flex-col items-center gap-1 text-xs hover:bg-[#4a4a4a]"
              >
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

      {/* Notes Modal */}
      {showNotes && (
        <NotesModal
          isOpen={showNotes}
          notes={notes}
          onSave={setNotes}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}
