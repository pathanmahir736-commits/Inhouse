const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  visit_scheduled: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  paid: "bg-purple-100 text-purple-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status]}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
}
