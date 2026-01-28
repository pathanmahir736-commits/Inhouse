export default function ConfirmModal({
  title = "Are you sure?",
  description,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded w-full max-w-sm p-6">
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && (
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
