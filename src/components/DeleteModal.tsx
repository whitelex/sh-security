interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold text-white mb-2">Delete Media File?</h3>
        <p className="text-gray-400 mb-6">This action cannot be undone.</p>
        
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}