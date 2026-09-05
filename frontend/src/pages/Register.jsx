import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Registration failed.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={logo}>T</div>

        <h1 style={title}>Create Account</h1>

        <p style={subtitle}>
          Join Trendora and start shopping
        </p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label style={label}>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            style={input}
            autoComplete="name"
          />

          <label style={label}>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={input}
            autoComplete="email"
          />

          <label style={label}>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            style={input}
            autoComplete="new-password"
          />

          <label style={terms}>
            <input type="checkbox" required />
            <span>I agree to the Terms & Conditions</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={loginText}>
          Already have an account?{" "}
          <Link to="/login" style={loginLink}>
            Sign In
          </Link>
        </p>

        <div style={security}>
          🔒 Your information is secure
        </div>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 20px",
  boxSizing: "border-box",
  background: "#f8fafc",
  fontFamily: "Arial, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "#ffffff",
  padding: "40px",
  boxSizing: "border-box",
  borderRadius: "18px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 35px rgba(15, 23, 42, 0.08)",
};

const logo = {
  width: "54px",
  height: "54px",
  margin: "0 auto 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
  background: "#2563eb",
  color: "#ffffff",
  fontSize: "25px",
  fontWeight: "800",
};

const title = {
  margin: "0",
  textAlign: "center",
  color: "#111827",
  fontSize: "28px",
  fontWeight: "800",
};

const subtitle = {
  marginTop: "8px",
  marginBottom: "30px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "14px",
};

const errorBox = {
  marginBottom: "20px",
  padding: "11px",
  borderRadius: "9px",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#dc2626",
  textAlign: "center",
  fontSize: "13px",
};

const label = {
  display: "block",
  marginBottom: "7px",
  color: "#374151",
  fontSize: "13px",
  fontWeight: "600",
};

const input = {
  width: "100%",
  height: "50px",
  padding: "0 14px",
  marginBottom: "18px",
  boxSizing: "border-box",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  outline: "none",
  background: "#ffffff",
  color: "#111827",
  fontSize: "14px",
};

const terms = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "2px",
  marginBottom: "22px",
  color: "#6b7280",
  fontSize: "12px",
  cursor: "pointer",
};

const button = {
  width: "100%",
  height: "50px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  boxShadow: "0 5px 15px rgba(37, 99, 235, 0.20)",
};

const loginText = {
  marginTop: "25px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "13px",
};

const loginLink = {
  color: "#2563eb",
  fontWeight: "700",
  textDecoration: "none",
};

const security = {
  marginTop: "18px",
  textAlign: "center",
  color: "#9ca3af",
  fontSize: "11px",
};