import { useState, useEffect ,useRef} from "react";
import {
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";
import DocumentsSection from "./DocumentSection";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { id: 1, label: "Basic Details" },
  { id: 2, label: "College Type" },
  { id: 3, label: "Address" },
  { id: 4, label: "Documents" },
];

export default function CollegeProfileWizard() {
  const [activeStep, setActiveStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const alertRef = useRef(null);
  const navigate = useNavigate();


  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const [form, setForm] = useState({
    collegeName: "",
    authorizedPerson: "",
    email: "",
    mobile: "",
    password: "",
    collegeType: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
  });

  const [documents, setDocuments] = useState({
    registration: null,
    approval: null,
    logo: null,
  });

  const [errors, setErrors] = useState({});

  /* ================= LOAD PROFILE ================= */
 useEffect(() => {
  const loadProfile = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/college/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      if (!data) return;

      setForm(prev => ({
        ...prev,
        collegeName: data.collegeName || "",
        authorizedPerson: data.authorizedPerson || "",
        email: data.email || "",
        mobile: data.mobile || "",
        collegeType: data.collegeType || "",
        state: data.state || "",
        city: data.city || "",
        address: data.address || "",
        pincode: data.pincode || "",
      }));

      // 🔥 THIS WAS MISSING
      if (data.documents) {
        setDocuments({
          registration: data.documents.registrationCertificate || null,
          approval: data.documents.approvalCertificate || null,
          logo: data.documents.logo || null,
        });
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  loadProfile();
}, []);

  /* ================= HELPERS ================= */
  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validateStep = () => {
    const e = {};

    if (activeStep === 1) {
      if (!form.collegeName) e.collegeName = "Required";
      if (!form.authorizedPerson) e.authorizedPerson = "Required";
      if (!form.email) e.email = "Required";
     if (!form.mobile) {
  e.mobile = "Mobile number is required";
} else if (!/^\d{10}$/.test(form.mobile)) {
  e.mobile = "Mobile number must be exactly 10 digits";
}
;
      if (!form.password || form.password.length < 8)
        e.password = "Minimum 8 characters";
    }

    if (activeStep === 2 && !form.collegeType)
      e.collegeType = "Select college type";

    if (activeStep === 3) {
      if (!form.state) e.state = "Required";
      if (!form.city) e.city = "Required";
      if (!form.address) e.address = "Required";
      if (!form.pincode) e.pincode = "Required";
    }

    if (activeStep === 4) {
      if (!documents.registration)
        e.registration = "Registration document required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () =>
    validateStep() && setActiveStep(s => Math.min(s + 1, 4));

  const back = () =>
    setActiveStep(s => Math.max(s - 1, 1));

  /* ================= SAVE PROFILE ================= */
 const saveProfile = async () => {
  if (isSaving) return;

  setIsSaving(true);

  try {
    const res = await fetch(
      "http://localhost:5000/api/college/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      setAlert({
        type: "error",
        message: "Failed to save profile. Please try again.",
      });
      return;
    }

    setAlert({
  type: "success",
  message: "Profile saved successfully.",
});
setTimeout(() => {
  navigate("/college/profile/view");
}, 800);

setTimeout(() => {
  alertRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 50);

  } catch {
    setAlert({
  type: "error",
  message: "Failed to save profile. Please try again.",
});

setTimeout(() => {
  alertRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 50);

  } finally {
    setIsSaving(false);
  }
};
const canAccessStep = (stepId) => {
  if (stepId === activeStep) return true;
  if (stepId < activeStep) return true;

  // prevent skipping ahead
  return false;
};


  /* ================= UI ================= */
  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      <div className="w-full max-w-5xl px-3 sm:px-6 space-y-6">

        {/* STEPPER */}
<div className="hidden sm:flex items-center justify-between mb-6">
  {STEPS.map((step, index) => {
    const isActive = activeStep === step.id;
    const isCompleted = activeStep > step.id;
    const isDisabled = activeStep < step.id;

    return (
      <div key={step.id} className="flex items-center w-full">
        
        {/* STEP CIRCLE */}
        <button
          disabled={isDisabled}
          onClick={() => {
  if (!canAccessStep(step.id)) return;
  setErrors({});
  setActiveStep(step.id);
}}

          className={`
            flex items-center justify-center
            h-10 w-10 rounded-full font-semibold text-sm
            transition
            ${
              isCompleted
                ? "bg-blue-600 text-white"
                : isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {step.id}
        </button>

        {/* LABEL */}
        <span
          className={`ml-3 text-sm font-medium
            ${
              isActive || isCompleted
                ? "text-blue-600"
                : "text-gray-400"
            }
          `}
        >
          {step.label}
        </span>

        {/* CONNECTOR */}
        {index !== STEPS.length - 1 && (
          <div
            className={`flex-1 h-0.5 mx-4
              ${
                isCompleted
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }
            `}
          />
        )}
      </div>
    );
  })}
</div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl px-4 py-6 sm:px-8 sm:py-8">

          {/* ALERT */}
          {alert.message && (
  <div
    ref={alertRef}
    className={`
      mb-6 flex items-start gap-4 rounded-xl px-5 py-4
      border shadow-sm animate-[slideDown_0.25s_ease-out]
      ${alert.type === "success"
        ? "bg-green-50 border-green-200 text-green-800"
        : "bg-red-50 border-red-200 text-red-800"}
    `}
  >

              <div className="mt-0.5">
                {alert.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>

              <div className="flex-1 text-sm font-medium">
                {alert.message}
              </div>

              <button
                onClick={() => setAlert({ type: "", message: "" })}
                className="opacity-60 hover:opacity-100 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {activeStep === 1 && (
            <Section title="Login & Basic Details">
              <Grid>
                <Input label="College Name"
                placeholder="Enter College Name"
                 value={form.collegeName} error={errors.collegeName}
                  onChange={e => update("collegeName", e.target.value)} />
                <Input label="Authorized Person" 
                placeholder="Enter Authorized Person's Name"
                value={form.authorizedPerson} error={errors.authorizedPerson}
                  onChange={e => update("authorizedPerson", e.target.value)} />
                <Input label="Email"
                  placeholder="Enter Email" 
                  value={form.email} error={errors.email}
                  onChange={e => update("email", e.target.value)} />
                <Input
  label="Mobile"
  placeholder="Enter 10-digit Mobile Number"
  value={form.mobile}
  error={errors.mobile}
  onChange={e => {
    const value = e.target.value.replace(/\D/g, ""); // digits only
    if (value.length <= 10) {
      update("mobile", value);
    }
  }}
/>

                <Input label="Password" 
                 placeholder="Enter Password"
                 type="password" value={form.password}
                  error={errors.password} className="md:col-span-2"
                  onChange={e => update("password", e.target.value)} />
              </Grid>
            </Section>
          )}

          {activeStep === 2 && (
            <Section title="Establishment Type">
              <Select
                label="College Type"
                value={form.collegeType}
                error={errors.collegeType}
                onChange={e => update("collegeType", e.target.value)}
                options={["Government", "Private", "Semi-Government", "Deemed University"]}
              />
            </Section>
          )}

          {activeStep === 3 && (
            <Section title="Address">
              <Grid>
                <Input label="State" 
                 placeholder="Enter State"
                 value={form.state} error={errors.state}
                  onChange={e => update("state", e.target.value)} />
                <Input label="City"
                 placeholder="Enter City"
                  value={form.city} error={errors.city}
                  onChange={e => update("city", e.target.value)} />
                <Textarea label="Address"
                 placeholder="Enter Full Address"
                  value={form.address} error={errors.address}
                  className="md:col-span-2"
                  onChange={e => update("address", e.target.value)} />
                <Input label="Pincode"
                 placeholder="Enter Pincode"
                  value={form.pincode} error={errors.pincode}
                  onChange={e => update("pincode", e.target.value)} />
              </Grid>
            </Section>
          )}

          {activeStep === 4 && (
            <DocumentsSection
              documents={documents}
              setDocuments={setDocuments}
              errors={errors}
            />
          )}

          <div className="mt-10 flex justify-between">
            {activeStep > 1 ? (
              <button
  onClick={back}
  disabled={isSaving}
  className={`border px-6 py-2 rounded-full transition
    ${isSaving ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  Back
</button>

            ) : <div />}

            <button
  onClick={activeStep === 4 ? saveProfile : next}
  disabled={activeStep === 4 && isSaving}
  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-full
    text-white transition
    ${activeStep === 4 && isSaving
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
    }`}
>
  {activeStep === 4 && isSaving ? (
    <>
      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
      Saving...
    </>
  ) : (
    activeStep === 4 ? "Save Profile" : "Continue"
  )}
</button>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  );
}

function Input({ label, error, className = "", ...props }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm">{label}</label>
      <input
  {...props}
  className={`w-full px-4 py-3 rounded-xl border outline-none transition
    ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
    }
  `}
/>

    </div>
  );
}

function Textarea({ label, error, className = "", ...props }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm">{label}</label>
      <textarea {...props}
        className={`w-full px-4 py-3 rounded-xl border
          ${error ? "border-red-500" : "border-gray-300"}`} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Select({ label, options, error, ...props }) {
  return (
    <div className="space-y-1 max-w-md">
      <label className="text-sm">{label}</label>
      <select {...props}
        className={`w-full px-4 py-3 rounded-xl border
          ${error ? "border-red-500" : "border-gray-300"}`}>
        <option value="">Select</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
