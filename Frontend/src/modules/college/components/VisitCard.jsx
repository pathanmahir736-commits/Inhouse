export default function VisitCard({ visit, onApprove, onReject }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm space-y-2">
      <div className="flex justify-between">
        <h3 className="font-semibold">{visit.studentName}</h3>
        <span
          className={`text-sm px-2 py-1 rounded ${
            visit.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : visit.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {visit.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        Course: {visit.course}
      </p>

      <p className="text-sm">
        Requested Slot: {visit.slot}
      </p>

      {visit.status === "PENDING" && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onApprove(visit)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(visit)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      )}

      {visit.status === "APPROVED" && (
        <p className="text-sm text-gray-700">
          Coordinator: {visit.coordinator}
        </p>
      )}
    </div>
  );
}
