import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
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
      alert(data.message);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={input}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={input}
        />

        <button onClick={handleSubmit} style={button}>
          Create Account
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
  fontFamily: "Arial",
};

const card = {
  background: "#111827",
  padding: "40px",
  borderRadius: "20px",
  width: "360px",
  border: "1px solid #1e293b",
};

const title = {
  marginBottom: "24px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#0b1220",
  color: "white",
};

const button = {
  width: "100%",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};