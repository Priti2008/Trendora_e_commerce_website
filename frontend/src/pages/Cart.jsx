import { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(saved);
  }, []);

  const removeItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: 40, color: "white", minHeight: "100vh", background: "#0f172a" }}>
      <h1>My Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#111827",
                padding: 20,
                borderRadius: 16,
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          <a
            href="/checkout"
            style={{
              display: "inline-block",
              marginTop: 20,
              background: "#2563eb",
              color: "white",
              padding: "12px 20px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Proceed to Checkout
          </a>
        </>
      )}
    </div>
  );
}