import PaymentRow from "./PaymentRow";

export default function PaymentTable({ payments }) {
  return (
    <div className="bg-white rounded shadow">
      {/* Desktop */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Course</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {payments.map(p => (
              <PaymentRow key={p.id} payment={p} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3 p-3">
        {payments.map(p => (
          <PaymentRow key={p.id} payment={p} mobile />
        ))}
      </div>
    </div>
  );
}
