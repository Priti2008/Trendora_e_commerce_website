import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

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

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/", { replace: true });
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={logo}>🛍️</div>

        <h1 style={title}>Welcome Back</h1>

        <p style={subtitle}>
          Login to your Trendora account
        </p>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={input}
            autoComplete="current-password"
          />

          <div style={forgotContainer}>
            <a
              href="#"
              style={forgot}
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p style={registerText}>
          Don't have an account?{" "}
          <Link to="/register" style={registerLink}>
            Create Account
          </Link>
        </p>

        <div style={security}>
          🔒 Secure login • Your data is protected
        </div>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #eef4ff, #f8fafc)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "#ffffff",
  padding: "45px",
  borderRadius: "24px",
  boxSizing: "border-box",
  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
  border: "1px solid #e5e7eb",
};

const logo = {
  width: "58px",
  height: "58px",
  margin: "0 auto 20px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #2563eb, #06b6d4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "27px",
};

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

const button = {
  width: "100%",
  height: "52px",
  border: "none",
  borderRadius: "11px",
  background: "linear-gradient(90deg, #2563eb, #06b6d4)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "700",
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.22)",
};

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

const security = {
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "11px",
  marginTop: "25px",
};