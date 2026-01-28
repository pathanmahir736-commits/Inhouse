export function useAdmissions() {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    // later: fetch("/api/admissions")
    setAdmissions(mockAdmissions);
  }, []);

  async function confirmAdmission(id) {
    // later:
    // await fetch(`/api/admissions/${id}/confirm`, { method: "POST" });

    setAdmissions(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: "confirmed" } : a
      )
    );
  }

  return {
    admissions,
    confirmAdmission,
  };
}
