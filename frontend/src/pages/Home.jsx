import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const card = {
    padding: "24px",
    borderRadius: "16px",
    background: "#f5f7fb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("newsletterEmail", email);

    setSubscribed(true);
    setEmail("");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        textAlign: "center",
        padding: "60px 20px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* ================= HERO SECTION ================= */}

      <h1
        style={{
          fontSize: "clamp(36px, 7vw, 64px)",
          marginBottom: "20px",
          lineHeight: "1.1",
        }}
      >
        Welcome to Trendora
      </h1>

      <p
        style={{
          fontSize: "clamp(17px, 3vw, 22px)",
          color: "#666",
          marginBottom: "40px",
        }}
      >
        Shop the latest sneakers, fashion, and accessories
      </p>

      <Link
        to="/products"
        style={{
          display: "inline-block",
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

      {/* ================= FEATURES ================= */}

      <div
        style={{
          marginTop: "60px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={card}>
          <h3>🔥 Trending</h3>
          <p>Latest fashion collection</p>
        </div>

        <div style={card}>
          <h3>👟 Sneaker </h3>
          <p>Premium branded shoes</p>
        </div>

        <div style={card}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and secure shipping</p>
        </div>
      </div>

      {/* ================= WHY TRENDORA ================= */}

      <div
        style={{
          marginTop: "60px",
          width: "100%",
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 36px)",
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
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
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

      {/* ================= NEWSLETTER ================= */}

      <section
        style={{
          width: "100%",
          padding: "70px 0 30px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "28px",
            padding: "50px 24px",
            border: "1px solid rgba(249,115,22,0.15)",
            boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              color: "#F97316",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            NEWSLETTER
          </p>

          <h2
            style={{
              fontSize: "clamp(32px, 6vw, 52px)",
              margin: "0",
              fontWeight: "800",
              lineHeight: "1.15",
              color: "#111827",
            }}
          >
            Stay ahead of the trend
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "16px auto 30px",
              color: "#6B7280",
              lineHeight: "1.7",
              fontSize: "15px",
            }}
          >
            Get exclusive drops, early access to new collections,
            and premium fashion updates delivered directly to your inbox.
          </p>

          {/* NEWSLETTER FORM */}

          <form
            onSubmit={handleSubscribe}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              boxSizing: "border-box",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubscribed(false);
              }}
              style={{
                width: "100%",
                maxWidth: "360px",
                height: "52px",
                padding: "0 18px",
                borderRadius: "999px",
                border: "1px solid rgba(249,115,22,0.25)",
                outline: "none",
                fontSize: "15px",
                background: "#FFF7F0",
                color: "#111827",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                width: "160px",
                height: "52px",
                padding: "0 25px",
                borderRadius: "999px",
                border: "none",
                background: "#F97316",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              Subscribe
            </button>
          </form>

          {/* SUCCESS MESSAGE */}

          {subscribed && (
            <p
              style={{
                marginTop: "20px",
                color: "#16A34A",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              ✓ Successfully subscribed to the Trendora newsletter!
            </p>
          )}

          <p
            style={{
              marginTop: "18px",
              fontSize: "12px",
              color: "#9CA3AF",
            }}
          >
            No spam. Only the latest Trendora updates.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;