import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // Save login information
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // React Router navigation
        // Do NOT use window.location.href here
        navigate("/", { replace: true });
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={input}
            disabled={loading}
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={input}
            disabled={loading}
            autoComplete="current-password"
          />

          <button
            type="submit"
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/register")}
          style={registerButton}
          disabled={loading}
        >
          Create an account
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#0b1220",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  boxSizing: "border-box",
};

const card = {
  background: "#111827",
  padding: "40px",
  borderRadius: "20px",
  width: "360px",
  maxWidth: "100%",
  border: "1px solid #1e293b",
  boxSizing: "border-box",
};

const title = {
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "28px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#0b1220",
  color: "white",
  boxSizing: "border-box",
  outline: "none",
  fontSize: "15px",
};

const button = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "15px",
};

const registerButton = {
  width: "100%",
  marginTop: "14px",
  background: "transparent",
  color: "#60a5fa",
  border: "none",
  padding: "10px",
  cursor: "pointer",
  fontSize: "14px",
};