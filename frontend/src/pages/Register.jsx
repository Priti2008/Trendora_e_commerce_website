import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
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

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "/";
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>

        {/* Logo */}
        <div style={logo}>
          T
        </div>

        <h1 style={title}>Create Account</h1>

        <p style={subtitle}>
          Join Trendora and start shopping
        </p>

        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <label style={label}>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            style={input}
          />

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
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            style={input}
          />

          {/* Terms */}
          <label style={terms}>
            <input type="checkbox" required />
            <span>I agree to the Terms & Conditions</span>
          </label>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={button}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login */}
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


/* =========================================
   PAGE
========================================= */

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


/* =========================================
   CARD
========================================= */

const card = {
  width: "100%",
  maxWidth: "420px",

  background: "#ffffff",

  padding: "40px",

  boxSizing: "border-box",

  borderRadius: "18px",

  border: "1px solid #e5e7eb",

  boxShadow:
    "0 10px 35px rgba(15, 23, 42, 0.08)",
};


/* =========================================
   LOGO
========================================= */

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


/* =========================================
   TITLE
========================================= */

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


/* =========================================
   ERROR
========================================= */

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


/* =========================================
   LABEL
========================================= */

const label = {
  display: "block",

  marginBottom: "7px",

  color: "#374151",

  fontSize: "13px",

  fontWeight: "600",
};


/* =========================================
   INPUT
========================================= */

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


/* =========================================
   TERMS
========================================= */

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


/* =========================================
   BUTTON
========================================= */

const button = {
  width: "100%",

  height: "50px",

  border: "none",

  borderRadius: "10px",

  background: "#2563eb",

  color: "#ffffff",

  fontSize: "15px",

  fontWeight: "700",

  cursor: "pointer",

  boxShadow:
    "0 5px 15px rgba(37, 99, 235, 0.20)",
};


/* =========================================
   LOGIN
========================================= */

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


/* =========================================
   SECURITY
========================================= */

const security = {
  marginTop: "18px",

  textAlign: "center",

  color: "#9ca3af",

  fontSize: "11px",
};