export default function Register() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b1220",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontFamily: "Arial"
    }}>
      <div style={{
        background: "#111827",
        padding: "40px",
        borderRadius: "20px",
        width: "360px",
        border: "1px solid #1e293b"
      }}>
        <h2 style={{ marginBottom: "24px", textAlign: "center" }}>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #374151",
            background: "#0b1220",
            color: "white"
          }}
        />

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #374151",
            background: "#0b1220",
            color: "white"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #374151",
            background: "#0b1220",
            color: "white"
          }}
        />

        <button style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          Create Account
        </button>
      </div>
    </div>
  );
}