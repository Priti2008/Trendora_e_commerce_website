import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>
        Welcome to Trendora
      </h1>

      <p style={{ fontSize: "22px", color: "#bbb", marginBottom: "40px" }}>
        Shop the latest sneakers, fashion, and accessories.
      </p>

      <Link
        to="/products"
        style={{
          background: "#2563eb",
          color: "white",
          padding: "14px 28px",
          borderRadius: "10px",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Explore Products
      </Link>

      <div
        style={{
          marginTop: "60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          marginInline: "auto",
        }}
      >
        <div style={card}>
          <h3>🔥 Trending</h3>
          <p>Latest fashion collection</p>
        </div>

        <div style={card}>
          <h3>👟 Sneakers</h3>
          <p>Premium branded shoes</p>
        </div>

        <div style={card}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and secure shipping</p>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "#111827",
  padding: "24px",
  borderRadius: "16px",
  border: "1px solid #1f2937",
};

export default Home;