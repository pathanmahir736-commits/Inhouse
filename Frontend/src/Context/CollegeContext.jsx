import { createContext, useContext, useEffect, useState } from "react";

const CollegeContext = createContext(null);

export const useCollege = () => useContext(CollegeContext);

export function CollegeProvider({ children }) {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setCollege(data);
      } catch (err) {
        console.error("Failed to load college profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <CollegeContext.Provider value={{ college, loading }}>
      {children}
    </CollegeContext.Provider>
  );
}
