import { useNavigate } from "react-router-dom";

export default function CollegeLogin() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/college/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "college@gmail.com",
        password: "password",
      }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/college/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>College Login (Dev Mode)</h2>
      <p>This is a dev-only login for demo</p>

      <button onClick={handleLogin}>
        Login as College
      </button>
    </div>
  );
}
