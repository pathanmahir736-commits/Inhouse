import { useEffect, useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  IndianRupee,
} from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }
        
        const res = await fetch(
          "http://localhost:5000/api/college/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } 
        );

        if (!res.ok) {
          console.error("Dashboard API error:", res.status);
          setLoading(false);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  if (loading) return <p>Loading dashboard...</p>;
  if (!data) return <p>Failed to load dashboard</p>;

  const filled = Number(data?.seats?.filled || 0);
  const total = Number(data?.seats?.total || 0);

  const percentage =
    total > 0 ? Math.round((filled / total) * 100) : 0;

  const cards = [
    {
      label: "Total Courses",
      value: data.totalCourses ?? 0,
      icon: <BookOpen />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Admissions",
      value: data.totalAdmissions ?? 0,
      icon: <Users />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Pending Admissions",
      value: data.pendingAdmissions ?? 0,
      icon: <Clock />,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      label: "Total Revenue",
      value: `₹${Number(data.totalRevenue || 0).toLocaleString()}`,
      icon: <IndianRupee />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="space-y-10">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(c => (
          <div
            key={c.label}
            className="bg-white rounded-2xl p-6 shadow flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${c.color}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{c.label}</p>
              <p className="text-2xl font-bold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SEAT UTILIZATION */}
      {/* SEAT UTILIZATION */}
<div className="bg-white rounded-2xl shadow p-6">
  <h3 className="font-semibold mb-3">Seat Utilization</h3>

  <p className="text-sm text-gray-500 mb-2">
    {filled} / {total} seats filled
  </p>

  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-3 bg-blue-600 rounded-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
    />
  </div>

  <p className="text-xs text-gray-500 mt-1">
    {percentage}% utilized
  </p>
</div>


      {/* RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Admissions */}
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="font-semibold mb-4">Recent Admissions</h3>

    <ul className="space-y-3 text-sm">
      {(data.recentAdmissions || []).map(a => (
        <li
          key={a._id}
          className="flex justify-between items-center"
        >
          <span>{a.studentName || "—"}</span>

          <span
            className={`px-2 py-1 rounded-xl text-xs font-semibold uppercase
              ${
                a.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : a.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {a.status || "—"}
          </span>
        </li>
      ))}
    </ul>
  </div>



        {/* Payments */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Recent Payments</h3>

          <ul className="space-y-3 text-sm">
            {(data.recentPayments || []).map(p => (
              <li
                key={p._id}
                className="flex justify-between"
              >
                <span>{p.studentName || "—"}</span>
                <span className="text-blue-600">
                  ₹{Number(p.amount || p.feePaid || 0).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
