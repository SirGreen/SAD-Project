import { Receipt } from 'lucide-react';

interface SuccessModalProps {
  customerName: string;
  orderId: string;
  total: number;
  onClose: () => void;
}

export function SuccessModal({ customerName, orderId, total, onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#2a2a2a] rounded-3xl p-16 max-w-lg w-full mx-4 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#10b981] p-6 rounded-3xl">
            <Receipt className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-4xl mb-6">
          Thank {customerName} for ordering
        </h2>

        {/* Order Details */}
        <div className="text-gray-400 text-xl space-y-2">
          <p>Your order ID: {orderId}</p>
          <p>Total: ${total}</p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-10 bg-[#10b981] text-white px-10 py-4 rounded-xl text-lg hover:bg-[#059669] transition-colors"
        >
          Continue Ordering
        </button>
      </div>
    </div>
  );
}
