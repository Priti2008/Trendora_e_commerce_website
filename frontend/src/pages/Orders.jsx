import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      try {
        const order = JSON.parse(savedOrder);
        setOrders([order]);
      } catch (error) {
        console.error("Failed to read order:", error);
        setOrders([]);
      }
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            fontSize: "32px",
          }}
        >
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div
            style={{
              background: "#111827",
              border: "1px solid #1e293b",
              borderRadius: "18px",
              padding: "50px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "50px",
                marginBottom: "15px",
              }}
            >
              📦
            </div>

            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              No orders yet
            </h2>

            <p
              style={{
                color: "#94a3b8",
                margin: 0,
              }}
            >
              Your orders will appear here after you place an order.
            </p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={order.id || index}
              style={{
                background: "#111827",
                padding: "24px",
                borderRadius: "18px",
                marginBottom: "18px",
                border: "1px solid #1e293b",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <strong>
                  {order.id || `#TRD-${Date.now()}`}
                </strong>

                <span
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {order.date || new Date().toLocaleDateString()}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  Total: {order.total || order.amount || "₹0"}
                </span>

                <span
                  style={{
                    background:
                      order.status === "Delivered"
                        ? "#14532d"
                        : "#1e3a8a",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {order.status || "Confirmed"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}