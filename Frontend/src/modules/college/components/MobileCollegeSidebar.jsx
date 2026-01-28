export default function MobileCollegeSidebar({ open, onClose, status }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside className="
        relative bg-white w-64 h-full p-4
      ">
        <p className="font-semibold mb-4">
          College Panel
        </p>

        <p className="text-sm text-gray-500">
          Limited access on mobile for now
        </p>

        {status !== "APPROVED" && (
          <p className="text-xs text-orange-600 mt-4">
            Under review
          </p>
        )}
      </aside>
    </div>
  );
}
