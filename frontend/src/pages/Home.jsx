import { Link } from "react-router-dom";

function Home() {
  const card = {
    padding: "24px",
    borderRadius: "12px",
    background: "#f5f7fb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "64px",
          marginBottom: "20px",
        }}
      >
        Welcome to Trendora
      </h1>

      <p
        style={{
          fontSize: "22px",
          color: "#666",
          marginBottom: "40px",
        }}
      >
        Shop the latest sneakers, fashion, and accessories
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

      {/* Existing features */}
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

      {/* NEW CONTRIBUTION */}
      <div
        style={{
          marginTop: "60px",
          maxWidth: "1000px",
          marginInline: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          Why Shop With Trendora?
        </h2>

        <p
          style={{
            fontSize: "18px",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Everything you need for a simple and enjoyable shopping experience.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={card}>
            <h3>🛍️ Wide Collection</h3>
            <p>
              Discover products for every style and occasion.
            </p>
          </div>

          <div style={card}>
            <h3>🔒 Secure Shopping</h3>
            <p>
              Enjoy a safe and reliable shopping experience.
            </p>
          </div>

          <div style={card}>
            <h3>⭐ Quality Products</h3>
            <p>
              Shop carefully selected products from Trendora.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;