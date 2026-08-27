import { useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      price: 4999,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Apple Watch",
      price: 24999,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

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
        <h1 style={{ marginBottom: "30px" }}>My Cart</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "24px",
          }}
        >
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#111827",
                  borderRadius: "20px",
                  padding: "18px",
                  marginBottom: "18px",
                  display: "flex",
                  gap: "18px",
                  alignItems: "center",
                  border: "1px solid #1e293b",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "8px" }}>{item.name}</h3>
                  <div style={{ color: "#94a3b8", marginBottom: "10px" }}>
                    Quantity: {item.qty}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{item.price}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#111827",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid #1e293b",
              height: "fit-content",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Cart Summary</h2>

            <div style={row}>
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div style={row}>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div style={row}>
              <span>Delivery</span>
              <span>₹99</span>
            </div>

            <hr style={{ borderColor: "#334155", margin: "20px 0" }} />

            <div
              style={{
                ...row,
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              <span>Total</span>
              <span>₹{total + 99}</span>
            </div>

            <a
              href="/checkout"
              style={{
                display: "block",
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
              Proceed to Checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "14px",
  color: "#e5e7eb",
};