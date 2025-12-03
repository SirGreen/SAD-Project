import { ImageWithFallback } from './figma/ImageWithFallback';
import { Utensils } from 'lucide-react';

interface WelcomePageProps {
  onStartOrdering: () => void;
}

export function WelcomePage({ onStartOrdering }: WelcomePageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden min-w-[1440px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop"
          alt="Restaurant background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff9a56]/90 via-[#ff7e5f]/85 to-[#feb47b]/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
        {/* Restaurant Icon */}
        <div className="mb-8 bg-white/20 backdrop-blur-sm p-8 rounded-full">
          <Utensils className="w-24 h-24 text-white" strokeWidth={1.5} />
        </div>

        <h1 className="text-7xl text-white mb-4 tracking-tight" style={{ fontWeight: 700 }}>
          Welcome to Restaurant
        </h1>
        <p className="text-3xl text-white/90 mb-12" style={{ fontWeight: 300 }}>
          Ready to order?
        </p>
        <button
          onClick={onStartOrdering}
          className="bg-white text-[#ff7e5f] px-16 py-5 rounded-2xl text-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          style={{ fontWeight: 600 }}
        >
          Start Ordering
        </button>
      </div>
    </div>
  );
}
