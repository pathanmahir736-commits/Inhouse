import { useEffect, useState } from "react";
import { fetchAdmissions } from "../services/admissionService";

export function useAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmissions().then(data => {
      setAdmissions(data || []);
      setLoading(false);
    });
  }, []);

  function confirmAdmission(id) {
    setAdmissions(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: "confirmed" } : a
      )
    );
  }

  return {
    admissions,
    loading,
    confirmAdmission,
  };
}
