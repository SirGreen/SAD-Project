import { X } from 'lucide-react';
import { useState } from 'react';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  onSave: (notes: string) => void;
}

export function NotesModal({ isOpen, onClose, notes, onSave }: NotesModalProps) {
  const [currentNotes, setCurrentNotes] = useState(notes);
  
  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(currentNotes);
    onClose();
  };

  const handleClear = () => {
    setCurrentNotes('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-[#2a2a2a] rounded-xl p-8 w-[600px] relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white bg-[#3a3a3a] hover:bg-[#4a4a4a] rounded-lg p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl mb-8">Order Notes</h2>

        <form onSubmit={handleSave}>
          <textarea
            value={currentNotes}
            onChange={(e) => setCurrentNotes(e.target.value)}
            placeholder="Add special instructions or notes for this order..."
            wrap="soft"
            className="w-full h-48 bg-[#3a3a3a] text-white text-lg rounded-lg p-5 border border-gray-700 focus:border-[#7d5fb5] focus:outline-none resize-none [&::selection]:bg-[#7d5fb5] [&::selection]:text-white"
          />

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors text-lg"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#3a3a3a] text-white px-8 py-4 rounded-lg hover:bg-[#4a4a4a] transition-colors text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#7d5fb5] text-white px-8 py-4 rounded-lg hover:bg-[#8d6fc5] transition-colors text-lg"
            >
              Save Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}