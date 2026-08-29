export default function Footer() {
  return (
    <footer
      style={{
        background: "#FFF7F0",
        borderTop: "1px solid rgba(251,146,60,0.15)",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "64px 32px 32px",
        }}
      >
        {/* Top Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#FB923C,#F97316)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 800,
                }}
              >
                T
              </div>

              <div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  Trendora
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    color: "#6B7280",
                    letterSpacing: "0.5px",
                  }}
                >
                  Fashion & Lifestyle
                </div>
              </div>
            </div>

            <p
              style={{
                color: "#6B7280",
                lineHeight: 1.7,
                fontSize: "14px",
              }}
            >
              Premium sneakers, apparel, and accessories designed for modern
              style, comfort, and everyday performance.
            </p>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              {["📘", "📸", "🐦", "▶️"].map((icon) => (
                <button
                  key={icon}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    border: "1px solid rgba(251,146,60,0.15)",
                    background: "white",
                    cursor: "pointer",
                    fontSize: "18px",
                    boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              style={{
                color: "#111827",
                fontWeight: 700,
                marginBottom: "18px",
              }}
            >
              Shop
            </h4>

            {["Sneakers", "Apparel", "Accessories", "New Arrivals", "Best Sellers"].map(
              (item) => (
                <p
                  key={item}
                  style={{
                    color: "#6B7280",
                    margin: "10px 0",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </p>
              )
            )}
          </div>

          {/* Support */}
          <div>
            <h4
              style={{
                color: "#111827",
                fontWeight: 700,
                marginBottom: "18px",
              }}
            >
              Support
            </h4>

            {["Help Center", "Shipping", "Returns", "Track Order", "Contact Us"].map(
              (item) => (
                <p
                  key={item}
                  style={{
                    color: "#6B7280",
                    margin: "10px 0",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {item}
                </p>
              )
            )}
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                color: "#111827",
                fontWeight: 700,
                marginBottom: "18px",
              }}
            >
              Stay Updated
            </h4>

            <p
              style={{
                color: "#6B7280",
                lineHeight: 1.7,
                fontSize: "14px",
                marginBottom: "18px",
              }}
            >
              Get exclusive offers, new arrivals, and fashion updates directly
              to your inbox.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "1px solid rgba(251,146,60,0.18)",
                  outline: "none",
                  fontSize: "14px",
                  background: "white",
                }}
              />

              <button
                style={{
                  background: "linear-gradient(135deg,#FB923C,#F97316)",
                  color: "white",
                  border: "none",
                  padding: "14px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(249,115,22,0.22)",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(251,146,60,0.12)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              color: "#6B7280",
              margin: 0,
              fontSize: "14px",
            }}
          >
            © 2026 Trendora. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
              <span
                key={item}
                style={{
                  color: "#6B7280",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}