import { useEffect, useState } from "react";

export default function Payments() {
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState({
    available: 0,
    pending: 0,
    collected: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setRows(data);

      // calculate stats
      let collected = 0;
      let pending = 0;

      data.forEach(p => {
        collected += p.paid;
        pending += p.remaining;
      });

      setStats({
        available: collected,
        pending,
        collected,
      });
    } catch (err) {
      console.error("Payment load error:", err);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Payments & Installments
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Student fee management, installments & collections
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Available */}
        <StatCard
          title="Available Balance"
          value={stats.available}
        />

        {/* Pending */}
        <StatCard
          title="Pending Collection"
          value={stats.pending}
        />

        {/* Collected */}
        <StatCard
          title="Total Collected"
          value={stats.collected}
          success
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <h3 className="text-lg font-semibold p-6 border-b">
          Student Payment Ledger
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Course</th>
                <th className="p-4">Total</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Remaining</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>

              {rows.map(r => (
                <tr
                  key={r._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {r.name}
                  </td>

                  <td className="p-4">
                    {r.email}
                  </td>

                  <td className="p-4">
                    {r.course}
                  </td>

                  <td className="p-4">
                    ₹{r.total.toLocaleString()}
                  </td>

                  <td className="p-4 text-green-600">
                    ₹{r.paid.toLocaleString()}
                  </td>

                  <td className="p-4 text-red-500">
                    ₹{r.remaining.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={r.status} />
                  </td>

                  <td className="p-4 flex gap-2">

                    <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                      View
                    </button>

                    <button className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Edit
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

/* ================================
   COMPONENTS
================================ */

function StatCard({ title, value, success }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p
        className={`text-2xl font-bold mt-2 ${
          success ? "text-green-600" : "text-gray-900"
        }`}
      >
        ₹{value.toLocaleString()}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    PAID: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
