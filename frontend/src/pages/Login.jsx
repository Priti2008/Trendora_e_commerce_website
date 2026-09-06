import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        window.location.href = "/";
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#6b7280",
          }}
        >
          Login to your Trendora account
        </p>

        {message && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#ecfdf5",
              color: "#059669",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#fef2f2",
              color: "#dc2626",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={input}
          />

          {/* Password */}
          <label style={label}>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={input}
          />

          {/* Forgot Password */}
          <div style={forgotContainer}>
            <a href="#" style={forgot}>
              Forgot Password?
            </a>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            style={button}
          >
            Sign In
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#6b7280",
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
   TEXT
================================ */

const title = {
  textAlign: "center",
  margin: "0",
  fontSize: "32px",
  fontWeight: "800",
  color: "#111827",
};

const subtitle = {
  textAlign: "center",
  color: "#64748b",
  fontSize: "14px",
  marginTop: "10px",
  marginBottom: "32px",
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
   INPUT
================================ */

const label = {
  display: "block",
  fontSize: "13px",
  fontWeight: "700",
  color: "#374151",
  marginBottom: "8px",
};

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