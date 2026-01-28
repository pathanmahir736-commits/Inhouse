export default function PaymentActions({ payment }) {
  if (!payment || payment.status !== "paid") {
    return (
      <span className="text-xs text-gray-400">
        Not available
      </span>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <a
        href={payment.receiptUrl}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-center"
      >
        View Receipt
      </a>

      <a
        href={payment.receiptUrl}
        download
        className="px-3 py-1 text-sm rounded bg-blue-600 text-white text-center"
      >
        Download Invoice
      </a>
    </div>
  );
}
