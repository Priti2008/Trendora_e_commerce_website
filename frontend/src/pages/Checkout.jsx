export default function Checkout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px" }}>Checkout</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "24px",
          }}
        >
          {/* Left Section */}
          <div
            style={{
              background: "#111827",
              padding: "24px",
              borderRadius: "20px",
              border: "1px solid #1e293b",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Delivery Address</h2>

            <input placeholder="Full Name" style={inputStyle} />
            <input placeholder="Phone Number" style={inputStyle} />
            <input placeholder="Address" style={inputStyle} />
            <input placeholder="City" style={inputStyle} />
            <input placeholder="State" style={inputStyle} />
            <input placeholder="PIN Code" style={inputStyle} />

            <h2 style={{ margin: "30px 0 20px" }}>Payment Method</h2>

            <label style={labelStyle}>
              <input type="radio" name="payment" defaultChecked /> UPI
            </label>

            <label style={labelStyle}>
              <input type="radio" name="payment" /> Debit / Credit Card
            </label>

            <label style={labelStyle}>
              <input type="radio" name="payment" /> Cash on Delivery
            </label>
          </div>

          {/* Right Section */}
          <div
            style={{
              background: "#111827",
              padding: "24px",
              borderRadius: "20px",
              border: "1px solid #1e293b",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Order Summary</h2>

            <div style={summaryRow}>
              <span>Nike Air Max</span>
              <span>₹4,999</span>
            </div>

            <div style={summaryRow}>
              <span>Apple Watch</span>
              <span>₹24,999</span>
            </div>

            <hr style={{ borderColor: "#334155", margin: "20px 0" }} />

            <div style={summaryRow}>
              <span>Subtotal</span>
              <span>₹29,998</span>
            </div>

            <div style={summaryRow}>
              <span>Delivery</span>
              <span>₹99</span>
            </div>

            <div style={summaryRow}>
              <span>Discount</span>
              <span>-₹500</span>
            </div>

            <hr style={{ borderColor: "#334155", margin: "20px 0" }} />

            <div
              style={{
                ...summaryRow,
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <span>Total</span>
              <span>₹29,597</span>
            </div>

            <a
              href="/success"
              style={{
                display: "block",
                width: "100%",
                marginTop: "24px",
                background: "#2563eb",
                color: "white",
                textDecoration: "none",
                textAlign: "center",
                padding: "14px",
                borderRadius: "14px",
                fontWeight: "bold",
              }}
            >
              Place Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "10px",
  border: "1px solid #374151",
  background: "#0b1220",
  color: "white",
};

const labelStyle = {
  display: "block",
  marginBottom: "14px",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "14px",
  color: "#e5e7eb",
};