import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Unable to connect to server. Make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        {/* Logo */}
        <div style={logo}>🛍️</div>

        {/* Title */}
        <h1 style={title}>Welcome Back</h1>

        <p style={subtitle}>
          Login to your Trendora account
        </p>

        {/* Success Message */}
        {message && (
          <div style={successBox}>
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <label style={label}>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={input}
          />

          {/* Password */}
          <label style={label}>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={input}
          />

          {/* Forgot Password */}
          <div style={forgotContainer}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={forgot}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <p style={registerText}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={registerLink}
          >
            Create Account
          </span>
        </p>

        {/* Security */}
        <p style={security}>
          🔒 Secure login • Your data is protected
        </p>
      </div>
    </div>
  );
}

/* ================================
   PAGE
================================ */

const page = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #eef4ff, #f8fafc)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
};

/* ================================
   CARD
================================ */

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "#ffffff",
  padding: "45px",
  borderRadius: "24px",
  boxSizing: "border-box",
  boxShadow:
    "0 20px 60px rgba(15, 23, 42, 0.12)",
  border: "1px solid #e5e7eb",
};

/* ================================
   LOGO
================================ */

const logo = {
  width: "58px",
  height: "58px",
  margin: "0 auto 20px",
  borderRadius: "16px",
  background:
    "linear-gradient(135deg, #2563eb, #06b6d4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "27px",
};

/* ================================
   TITLE
================================ */

const title = {
  textAlign: "center",
  margin: "0",
  fontSize: "32px",
  fontWeight: "800",
  color: "#111827",
};

/* ================================
   SUBTITLE
================================ */

const subtitle = {
  textAlign: "center",
  color: "#64748b",
  fontSize: "14px",
  marginTop: "10px",
  marginBottom: "32px",
};

/* ================================
   SUCCESS
================================ */

const successBox = {
  background: "#ecfdf5",
  color: "#059669",
  border: "1px solid #a7f3d0",
  borderRadius: "10px",
  padding: "11px",
  marginBottom: "20px",
  textAlign: "center",
  fontSize: "13px",
};

/* ================================
   ERROR
================================ */

const errorBox = {
  background: "#fef2f2",
  color: "#dc2626",
  border: "1px solid #fecaca",
  borderRadius: "10px",
  padding: "11px",
  marginBottom: "20px",
  textAlign: "center",
  fontSize: "13px",
};

/* ================================
   LABEL
================================ */

const label = {
  display: "block",
  fontSize: "13px",
  fontWeight: "700",
  color: "#374151",
  marginBottom: "8px",
};

/* ================================
   INPUT
================================ */

const input = {
  width: "100%",
  height: "50px",
  padding: "0 15px",
  marginBottom: "20px",
  boxSizing: "border-box",
  border: "1px solid #d1d5db",
  borderRadius: "11px",
  outline: "none",
  background: "#f9fafb",
  color: "#111827",
  fontSize: "14px",
};

/* ================================
   FORGOT PASSWORD
================================ */

const forgotContainer = {
  textAlign: "right",
  marginBottom: "22px",
};

const forgot = {
  color: "#2563eb",
  fontSize: "13px",
  textDecoration: "none",
  fontWeight: "600",
};

/* ================================
   BUTTON
================================ */

const button = {
  width: "100%",
  height: "52px",
  border: "none",
  borderRadius: "11px",
  background:
    "linear-gradient(90deg, #2563eb, #06b6d4)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(37, 99, 235, 0.22)",
};

/* ================================
   REGISTER
================================ */

const registerText = {
  textAlign: "center",
  color: "#64748b",
  fontSize: "13px",
  marginTop: "28px",
};

const registerLink = {
  color: "#2563eb",
  fontWeight: "700",
  textDecoration: "none",
  cursor: "pointer",
};

/* ================================
   SECURITY
================================ */

const security = {
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "11px",
  marginTop: "25px",
};