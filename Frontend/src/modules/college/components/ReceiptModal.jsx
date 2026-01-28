export default function ReceiptModal({ payment, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-sm p-6 rounded space-y-3">
        <h2 className="font-semibold text-lg">
          Payment Receipt
        </h2>

        <div className="text-sm space-y-1">
          <p>
            <strong>Student:</strong>{" "}
            {payment.student.name}
          </p>
          <p>
            <strong>Course:</strong>{" "}
            {payment.course.name}
          </p>
          <p>
            <strong>Amount:</strong> ₹{" "}
            {payment.fee.toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> Paid
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Close
          </button>

          <button
            onClick={() => alert("PDF download later")}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
