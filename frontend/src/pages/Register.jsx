import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!form.password) {
      setError("Please enter a password.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Send only the fields expected by your backend
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccess("Account created successfully!");

        // Go to home page after successful registration
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        {/* Brand */}
        <div style={brandIcon}>🛍️</div>

        <h1 style={title}>Create Account</h1>

        <p style={subtitle}>
          Join Trendora and start shopping today
        </p>

        {/* Error message */}
        {error && <div style={errorBox}>{error}</div>}

        {/* Success message */}
        {success && <div style={successBox}>{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label style={label}>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            style={input}
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />

          {/* Confirm Password */}
          <label style={label}>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={input}
            disabled={loading}
          />

          {/* Password information */}
          <p style={passwordHint}>
            Password must contain at least 6 characters.
          </p>

          {/* Button */}
          <button
            type="submit"
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <div style={loginText}>
          Already have an account?{" "}
          <a href="/login" style={loginLink}>
            Login
          </a>
        </div>

        {/* Footer */}
        <p style={footer}>
          By creating an account, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

/* =========================
   PAGE STYLES
========================= */

const container = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #020617 0%, #0b1220 45%, #123a73 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 20px",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "430px",
  background: "rgba(17, 24, 39, 0.96)",
  padding: "42px",
  borderRadius: "24px",
  border: "1px solid #263449",
  boxShadow: "0 25px 70px rgba(0, 0, 0, 0.45)",
  boxSizing: "border-box",
};

const brandIcon = {
  width: "64px",
  height: "64px",
  margin: "0 auto 16px",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #2563eb, #06b6d4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
};

const title = {
  margin: "0",
  textAlign: "center",
  color: "#ffffff",
  fontSize: "30px",
  fontWeight: "700",
};

const subtitle = {
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "14px",
  marginTop: "10px",
  marginBottom: "30px",
};

const label = {
  display: "block",
  color: "#e2e8f0",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "8px",
};

const input = {
  width: "100%",
  padding: "14px 15px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0b1220",
  color: "#ffffff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const passwordHint = {
  color: "#64748b",
  fontSize: "12px",
  marginTop: "-8px",
  marginBottom: "20px",
};

const button = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #2563eb, #06b6d4)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "700",
  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.25)",
};

const errorBox = {
  background: "#3f1515",
  border: "1px solid #7f1d1d",
  color: "#fca5a5",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "14px",
  marginBottom: "20px",
  textAlign: "center",
};

const successBox = {
  background: "#052e1a",
  border: "1px solid #166534",
  color: "#86efac",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "14px",
  marginBottom: "20px",
  textAlign: "center",
};

const loginText = {
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "14px",
  marginTop: "24px",
};

const loginLink = {
  color: "#38bdf8",
  fontWeight: "700",
  textDecoration: "none",
};

const footer = {
  color: "#64748b",
  fontSize: "11px",
  textAlign: "center",
  lineHeight: "1.5",
  marginTop: "22px",
  marginBottom: "0",
};