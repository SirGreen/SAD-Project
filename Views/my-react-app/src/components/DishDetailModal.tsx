import { X, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;    // Đây là URL đầy đủ từ API
  category: string;
  detail?: string;  // Dữ liệu mô tả từ API
}

interface DishDetailModalProps {
  dish: MenuItem;
  onClose: () => void;
}

export function DishDetailModal({ dish, onClose }: DishDetailModalProps) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      {/* Thêm e.stopPropagation để click vào modal không bị đóng, click ra ngoài mới đóng */}
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-4 rounded-2xl">
                <Utensils className="w-8 h-8 text-gray-700" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Dish Details</h2>
                <p className="text-gray-500 text-lg">Recheck what you ordered</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Dish Card */}
          <div className="bg-[#2a2a2a] rounded-2xl p-8 shadow-inner">
            <div className="flex items-start gap-6 mb-8">
              <ImageWithFallback
                src={dish.image} // Dùng trực tiếp URL từ props
                alt={dish.name}
                className="w-32 h-32 rounded-2xl object-cover flex-shrink-0 bg-gray-700"
              />
              <div className="flex-1 flex justify-between items-start">
                <h3 className="text-white text-3xl font-bold leading-tight pr-4">{dish.name}</h3>
                <span className="text-[#b4f4d9] text-3xl font-bold whitespace-nowrap">${dish.price}</span>
              </div>
            </div>

            {/* Description Section */}
            <div className="text-white border-t border-gray-600 pt-6">
              <h4 className="text-2xl text-center mb-6 font-semibold text-gray-300">Description</h4>
              <p className="text-xl leading-relaxed text-gray-200 text-center font-light">
                {dish.detail || "No description available for this dish."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay click to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
}
