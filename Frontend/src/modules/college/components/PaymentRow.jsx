import { useState } from "react";
import ReceiptModal from "./ReceiptModal";

export default function PaymentRow({ payment, mobile }) {
  const [open, setOpen] = useState(false);

  if (mobile) {
    return (
      <div className="border rounded p-3 space-y-2">
        <div>
          <p className="font-medium">
            {payment.student.name}
          </p>
          <p className="text-xs text-gray-500">
            {payment.course.name}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">
            ₹ {payment.fee.toLocaleString()}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 text-sm"
          >
            View Receipt
          </button>
        </div>

        {open && (
          <ReceiptModal
            payment={payment}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <tr className="border-b">
        <td className="p-3">
          <div className="font-medium">
            {payment.student.name}
          </div>
          <div className="text-xs text-gray-500">
            {payment.student.email}
          </div>
        </td>

        <td className="p-3">
          {payment.course.name}
        </td>

        <td className="p-3 font-medium">
          ₹ {payment.fee.toLocaleString()}
        </td>

        <td className="p-3 text-sm text-gray-500">
          {payment.appliedAt || "—"}
        </td>

        <td className="p-3">
          <button
            onClick={() => setOpen(true)}
            className="text-blue-600 text-sm"
          >
            View Receipt
          </button>
        </td>
      </tr>

      {open && (
        <ReceiptModal
          payment={payment}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
