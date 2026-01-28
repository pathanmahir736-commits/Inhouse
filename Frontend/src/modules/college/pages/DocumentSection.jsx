import { Upload } from "lucide-react";
import { useRef } from "react";
import { RefreshCcw } from "lucide-react";


export default function DocumentsSection({ documents, setDocuments, errors }) {
  const refs = {
    registration: useRef(null),
    approval: useRef(null),
    logo: useRef(null),
  };

  const upload = async (type, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // MUST be "file"

    const res = await fetch(
      `http://localhost:5000/api/college/profile/documents/${type}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      alert("Upload failed");
      return;
    }

    const data = await res.json();

    // 🔒 Always store backend object, never File
    setDocuments(prev => ({
      ...prev,
      [type]:
        type === "registration"
          ? data.documents.registrationCertificate
          : type === "approval"
          ? data.documents.approvalCertificate
          : data.documents.logo,
    }));
  };

  return (
    <div className="space-y-6">
      <UploadRow
        label="College Registration Certificate"
        value={documents.registration}
        error={errors?.registration}
        onClick={() => refs.registration.current.click()}
      />
      <input
        ref={refs.registration}
        type="file"
        className="hidden"
        onChange={e => upload("registration", e.target.files[0])}
      />

      <UploadRow
        label="AICTE / UGC Approval (Optional)"
        value={documents.approval}
        onClick={() => refs.approval.current.click()}
      />
      <input
        ref={refs.approval}
        type="file"
        className="hidden"
        onChange={e => upload("approval", e.target.files[0])}
      />

      <UploadRow
        label="College Logo"
        value={documents.logo}
        onClick={() => refs.logo.current.click()}
      />
      <input
        ref={refs.logo}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => upload("logo", e.target.files[0])}
      />
    </div>
  );
}

/* ================= SINGLE ROW ================= */

function UploadRow({ label, value, onClick, error }) {
  const uploaded = Boolean(value);
  const fileName = value?.originalName ?? null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100 rounded-xl p-4">
      <div>
        <p className="font-medium">{label}</p>

        {uploaded ? (
          <div className="text-sm text-green-600 mt-1">
            <div className="flex items-center gap-2">✅ Uploaded</div>
            {fileName && (
              <p className="text-xs text-gray-500 mt-1">{fileName}</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-1">Not uploaded</p>
        )}

        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>

      <button
  type="button"
  onClick={onClick}
  className={`inline-flex items-center justify-center gap-2 px-5 py-2
    rounded-lg text-sm font-medium transition whitespace-nowrap
    ${
      uploaded
        ? "bg- text- border border-gray-400 hover:bg-gray-50 hover:cursor-pointer"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
>
  {uploaded ? (
    <>
      <RefreshCcw size={16} className="shrink-0" />
      <span>Replace</span>
    </>
  ) : (
    <>
      <Upload size={16} className="shrink-0" />
      <span>Upload</span>
    </>
  )}
</button>

    </div>
  );
}
