import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // =========================
  // FORM DATA
  // =========================
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check email
    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Check password
    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      // Connect to backend
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      // IMPORTANT:
      // Use res.json(), NOT response.json()
      const data = await res.json();

      console.log("Login response:", data);

      // =========================
      // LOGIN SUCCESS
      // =========================
      if (res.ok && data.success) {
        // Save user
        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        // Save token
        if (data.token) {
          localStorage.setItem(
            "token",
            data.token
          );
        }

        setMessage("Login successful!");

        // Redirect to Home page
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      } else {
        setError(
          data.message ||
            "Invalid email or password."
        );
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Unable to connect to server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FORGOT PASSWORD
  // =========================
  const handleForgotPassword = (e) => {
    e.preventDefault();

    alert(
      "Forgot password functionality will be added soon."
    );
  };

  // =========================
  // PAGE STYLE
  // =========================
  const page = {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #eef4ff, #f8fafc)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  };

  // =========================
  // CARD STYLE
  // =========================
  const card = {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "24px",
    boxSizing: "border-box",
    boxShadow:
      "0 20px 60px rgba(15, 23, 42, 0.12)",
    border: "1px solid #e5e7eb",
  };

  // =========================
  // LOGO
  // =========================
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

  // =========================
  // INPUT STYLE
  // =========================
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

  // =========================
  // LABEL
  // =========================
  const label = {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
    marginBottom: "8px",
  };

  // =========================
  // BUTTON
  // =========================
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
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    boxShadow:
      "0 8px 20px rgba(37, 99, 235, 0.22)",
  };

  return (
    <div style={page}>
      <div style={card}>

        {/* =========================
            LOGO
        ========================= */}
        <div style={logo}>
          🛍️
        </div>

        {/* =========================
            TITLE
        ========================= */}
        <h1
          style={{
            textAlign: "center",
            margin: "0",
            fontSize: "32px",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
            marginTop: "10px",
            marginBottom: "32px",
          }}
        >
          Login to your Trendora account
        </p>

        {/* =========================
            SUCCESS MESSAGE
        ========================= */}
        {message && (
          <div
            style={{
              background: "#ecfdf5",
              color: "#059669",
              border:
                "1px solid #a7f3d0",
              borderRadius: "10px",
              padding: "11px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {message}
          </div>
        )}

        {/* =========================
            ERROR MESSAGE
        ========================= */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              border:
                "1px solid #fecaca",
              borderRadius: "10px",
              padding: "11px",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {/* =========================
            LOGIN FORM
        ========================= */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <label style={label}>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            style={input}
          />

          {/* PASSWORD */}
          <label style={label}>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            style={input}
          />

          {/* FORGOT PASSWORD */}
          <div
            style={{
              textAlign: "right",
              marginBottom: "22px",
            }}
          >
            <a
              href="#"
              onClick={handleForgotPassword}
              style={{
                color: "#2563eb",
                fontSize: "13px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={button}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        {/* =========================
            REGISTER
        ========================= */}
        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            marginTop: "28px",
          }}
        >
          Don't have an account?{" "}

          <span
            onClick={() =>
              navigate("/register")
            }
            style={{
              color: "#2563eb",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Create Account
          </span>
        </p>

        {/* =========================
            SECURITY
        ========================= */}
        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "11px",
            marginTop: "25px",
          }}
        >
          🔒 Secure login · Your data is protected
        </p>

      </div>
    </div>
  );
}