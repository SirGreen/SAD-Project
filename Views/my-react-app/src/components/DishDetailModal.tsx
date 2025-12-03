import { X, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface DishDetailModalProps {
  dish: MenuItem;
  onClose: () => void;
}

export function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  const getImageUrl = (image: string) => {
    switch (image) {
      case 'pizza':
        return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop';
      case 'burger':
        return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop';
      case 'wings':
        return 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=400&fit=crop';
      case 'salad':
        return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop';
    }
  };

  const getDescription = (name: string, category: string) => {
    if (dish.description) return dish.description;
    
    // Default descriptions based on category
    switch (category) {
      case 'pizza':
        return 'Indulge in the perfect cheese pizza. Hand-tossed dough baked to perfection, slathered with rich marinara, and finished with a bubbling, gooey layer of 100% real mozzarella.';
      case 'burger':
        return 'Juicy beef patty grilled to perfection, topped with fresh lettuce, tomatoes, onions, pickles, and our special sauce. Served on a toasted brioche bun.';
      case 'wings':
        return 'Crispy chicken wings tossed in your choice of sauce. Served with celery sticks and ranch dressing for the ultimate flavor experience.';
      case 'salads':
        return 'Fresh mixed greens with seasonal vegetables, premium toppings, and your choice of dressing. A healthy and delicious option.';
      default:
        return 'Delicious dish prepared with fresh ingredients and served with care.';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <Utensils className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h2 className="text-3xl text-gray-900">Dish Details</h2>
                <p className="text-gray-500 text-lg">Recheck what you ordered</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Dish Card */}
          <div className="bg-[#2a2a2a] rounded-2xl p-8">
            <div className="flex items-start gap-6 mb-8">
              <ImageWithFallback
                src={getImageUrl(dish.image)}
                alt={dish.name}
                className="w-32 h-32 rounded-2xl object-cover flex-shrink-0"
              />
              <div className="flex-1 flex justify-between items-start">
                <h3 className="text-white text-3xl">{dish.name}</h3>
                <span className="text-white text-3xl">${dish.price}</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="text-white">
              <h4 className="text-2xl text-center mb-6">Description</h4>
              <p className="text-xl leading-relaxed">
                {getDescription(dish.name, dish.category)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
