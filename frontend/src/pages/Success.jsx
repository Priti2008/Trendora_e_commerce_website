export default function Success() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "50px",
          borderRadius: "24px",
          textAlign: "center",
          border: "1px solid #1e293b",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "72px", marginBottom: "20px" }}>✅</div>

        <h1 style={{ marginBottom: "12px" }}>Order Placed Successfully!</h1>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.7,
            marginBottom: "30px",
          }}
        >
          Thank you for shopping with Trendora. Your order has been confirmed
          and will be delivered soon.
        </p>

        <div
          style={{
            background: "#0b1220",
            padding: "18px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #1e293b",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <strong>Order ID:</strong> #TRD2026-7842
          </div>

          <div style={{ marginBottom: "8px" }}>
            <strong>Amount:</strong> ₹29,597
          </div>

          <div>
            <strong>Status:</strong>{" "}
            <span style={{ color: "#22c55e" }}>Confirmed</span>
          </div>
        </div>

        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "white",
            textDecoration: "none",
            padding: "14px 28px",
            borderRadius: "14px",
            fontWeight: "bold",
          }}
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}