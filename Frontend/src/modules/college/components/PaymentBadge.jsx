export default function PaymentBadge({ status }) {
  if (status === "paid") {
    return (
      <span className="px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">
        Paid
      </span>
    );
  }

  if (status === "failed") {
    return (
      <span className="px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">
        Failed
      </span>
    );
  }

  return (
    <span className="px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700">
      Unpaid
    </span>
  );
}
