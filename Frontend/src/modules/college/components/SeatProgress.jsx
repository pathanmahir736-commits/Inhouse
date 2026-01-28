export default function SeatProgress({ total, filled }) {
  const percentage = Math.round((filled / total) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{filled} / {total} seats filled</span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded h-2">
        <div
          className="bg-blue-600 h-2 rounded transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
