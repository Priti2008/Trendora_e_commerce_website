export default function Orders() {
  const orders = [
    {
      id: "#TRD2026-7842",
      date: "3 Aug 2026",
      total: "₹29,597",
      status: "Delivered",
    },
    {
      id: "#TRD2026-7819",
      date: "1 Aug 2026",
      total: "₹4,999",
      status: "Shipped",
    },
  ];

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
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px" }}>My Orders</h1>

        {orders.map((order) => (
          <div
            key={order.id}
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
                marginBottom: "12px",
              }}
            >
              <strong>{order.id}</strong>
              <span style={{ color: "#94a3b8" }}>{order.date}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Total: {order.total}</span>

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
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}