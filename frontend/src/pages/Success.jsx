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
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "50px",
          borderRadius: "24px",
          textAlign: "center",
          border: "1px solid #1e293b",
          maxWidth: "560px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 25px",
            fontSize: "48px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ✓
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "15px",
            marginTop: "0",
          }}
        >
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p
          style={{
            fontSize: "18px",
            color: "#cbd5e1",
            lineHeight: "1.7",
            marginBottom: "30px",
          }}
        >
          Thank you for shopping with Trendora. Your order has been confirmed
          and will be delivered soon.
        </p>

        {/* Order Details */}
        <div
          style={{
            background: "#0b1220",
            padding: "22px",
            borderRadius: "16px",
            marginBottom: "30px",
            border: "1px solid #1e293b",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "14px",
              gap: "10px",
            }}
          >
            <strong>Order ID:</strong>
            <span>#TRD2026-7842</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "14px",
              gap: "10px",
            }}
          >
            <strong>Amount:</strong>
            <span>₹29,597</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <strong>Status:</strong>
            <span
              style={{
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              Confirmed ✓
            </span>
          </div>
        </div>

        {/* Delivery Message */}
        <div
          style={{
            background: "#172033",
            padding: "18px",
            borderRadius: "14px",
            marginBottom: "30px",
            color: "#cbd5e1",
          }}
        >
          📦 Your order is being prepared for delivery.
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/"
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "12px",
              fontWeight: "bold",
            }}
          >
            Continue Shopping
          </a>

          <a
            href="/orders"
            style={{
              display: "inline-block",
              background: "#1e293b",
              color: "white",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "12px",
              fontWeight: "bold",
              border: "1px solid #334155",
            }}
          >
            View My Orders
          </a>
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "30px",
            marginBottom: "0",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Thank you for choosing Trendora ❤️
        </p>
      </div>
    </div>
  );
}