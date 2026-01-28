import { useEffect, useState } from "react";
import StudentProfileDrawer from "../components/StudentProfileDrawer";

export default function Admissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  const token = localStorage.getItem("token");

  /* ================= LOAD ADMISSIONS ================= */
  const loadAdmissions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setAdmissions(data);
    } catch (err) {
      console.error("Failed to load admissions:", err.message);
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadAdmissions();
  }, [token]);

  /* ================= ACTIONS ================= */

  const approve = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(
        `http://localhost:5000/api/admissions/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Approve failed");
      }

      loadAdmissions();
    } catch (err) {
      alert("Failed to approve admission");
    } finally {
      setActionLoading(null);
    }
  };

  const reject = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(
        `http://localhost:5000/api/admissions/${id}/reject`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Reject failed");
      }

      loadAdmissions();
    } catch (err) {
      alert("Failed to reject admission");
    } finally {
      setActionLoading(null);
    }
  };

  const collectFee = async (id) => {
    setActionLoading(id);
    try {
      const res = await fetch(
        `http://localhost:5000/api/payments/collect/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      loadAdmissions();
    } catch (err) {
      alert("Failed to collect fee");
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <p className="text-gray-500">Loading admissions...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Student Admissions</h2>

      {admissions.length === 0 && (
        <p className="text-gray-500">No admission requests yet.</p>
      )}

      {admissions.map((a) => (
        <div
          key={a._id}
          className="bg-white border border-gray-300 hover:shadow-xl rounded-xl shadow-sm p-6 max-w-4xl mx-auto"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{a.studentName}</h3>
              <p className="text-sm text-gray-500">{a.email}</p>
              <p className="text-sm mt-1">
                Course:{" "}
                <span className="font-medium">
                  {a.courseId?.name || "—"}
                </span>
              </p>

              <button
                onClick={() => setSelectedAdmission(a)}
                className="text-blue-600 text-sm mt-2 hover:underline"
              >
                View Student Details
              </button>
            </div>

            {/* STATUS */}
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold uppercase ${
                a.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : a.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {a.status}
            </span>
          </div>

          <div className="border-t border-gray-300 my-4" />

          {/* ACTIONS */}
          <div className="flex gap-3 flex-wrap">
            {a.status === "pending" && (
              <>
                <button
                  disabled={actionLoading === a._id}
                  onClick={() => approve(a._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Approve
                </button>

                <button
                  disabled={actionLoading === a._id}
                  onClick={() => reject(a._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Reject
                </button>
              </>
            )}

            {a.status === "approved" && a.feeCollected === false && (
              <button
                disabled={actionLoading === a._id}
                onClick={() => collectFee(a._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Collect Fee
              </button>
            )}

            {a.feeCollected === true && (
              <span className="text-green-700 text-sm font-medium">
                Fee Collected
              </span>
            )}
          </div>
        </div>
      ))}

      {/* STUDENT DETAILS DRAWER */}
      <StudentProfileDrawer
        admission={selectedAdmission}
        onClose={() => setSelectedAdmission(null)}
      />
    </div>
  );
}
