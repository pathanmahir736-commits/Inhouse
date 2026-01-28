import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CollegeProfileView() {
  const [profile, setProfile] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const navigate = useNavigate();

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const load = async () => {
      const res = await fetch(
        "http://localhost:5000/api/college/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setProfile(data);
    };

    load();
  }, []);

  /* ================= ESC TO CLOSE MODAL ================= */
  useEffect(() => {
    if (!previewDoc) return;

    const onKey = (e) => {
      if (e.key === "Escape") setPreviewDoc(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewDoc]);

  if (!profile) return <div className="p-6">Loading profile...</div>;

  const logoUrl = profile.documents?.logo
    ? `http://localhost:5000/${profile.documents.logo.path}`
    : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="College Logo"
              className="h-20 w-20 object-contain rounded-xl border"
            />
          ) : (
            <div className="h-20 w-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
              No Logo
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold">{profile.collegeName}</h1>
            <p className="text-sm text-gray-500">
              {profile.collegeType || "College"}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/college/profile")}
          className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Section title="Basic Details">
          <Row label="Authorized Person" value={profile.authorizedPerson} />
          <Row label="Email" value={profile.email} />
          <Row label="Mobile" value={profile.mobile} />
        </Section>

        <Section title="Address">
          <Row label="State" value={profile.state} />
          <Row label="City" value={profile.city} />
          <Row label="Pincode" value={profile.pincode} />
          <Row label="Address" value={profile.address} />
        </Section>
      </div>

      {/* ================= DOCUMENTS ================= */}
      <Section title="Documents">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DocCard
            label="Registration Certificate"
            doc={profile.documents?.registrationCertificate}
            onView={setPreviewDoc}
          />
          <DocCard
            label="AICTE / UGC Approval"
            doc={profile.documents?.approvalCertificate}
            onView={setPreviewDoc}
          />
        </div>
      </Section>

      {/* ================= MODAL ================= */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] relative p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-3 right-3 px-3 py-1 text-sm rounded-full border hover:bg-gray-100"
            >
              Close
            </button>

            <iframe
              src={`http://localhost:5000/${previewDoc.path}`}
              className="w-full h-full rounded-lg"
              title="Document Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b py-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value || "-"}</span>
    </div>
  );
}

function DocCard({ label, doc, onView }) {
  if (!doc) return null;

  return (
    <div className="border rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{doc.originalName}</p>
      </div>

      <button
        onClick={() => onView(doc)}
        className="px-4 py-1.5 text-sm rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
      >
        View
      </button>
    </div>
  );
}
