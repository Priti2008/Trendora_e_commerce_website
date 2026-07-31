import { useState } from "react";
import Navbar from "./components/Navbar";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Puma Runner",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Apple Watch",
    price: 24999,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Fossil Watch",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "RayBan Sunglasses",
    price: 6499,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Converse Black",
    price: 3599,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Leather Backpack",
    price: 5299,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Jordan Retro",
    price: 7999,
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Casio Vintage",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Leather Wallet",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Sport Cap",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    name: "Denim Jacket",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    name: "White Sneakers",
    price: 4599,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart`);
  };

  const buyNow = (product) => {
    alert(`Proceeding to buy ${product.name}`);
  };

  return (
    <div
      style={{
        background: "#0b1220",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Inter, Arial",
      }}
    >
      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        searchTerm={search}
        setSearchTerm={setSearch}
      />

      {/* Banner */}
      <div
        style={{
          position: "relative",
          height: "340px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(11,18,32,0.72)",
          }}
        />

        <div style={{ position: "relative", maxWidth: "520px" }}>
          <h1
            style={{
              fontSize: "44px",
              lineHeight: 1.1,
              marginBottom: "14px",
              fontWeight: 800,
            }}
          >
            Premium Dark Fashion
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "16px",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Discover premium sneakers, watches and accessories for a modern and
            elegant lifestyle.
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() =>
                window.scrollTo({ top: 360, behavior: "smooth" })
              }
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "12px 22px",
                borderRadius: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>

            <button
              onClick={() =>
                window.scrollTo({ top: 360, behavior: "smooth" })
              }
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "12px 22px",
                borderRadius: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <h2 style={{ fontSize: "32px", fontWeight: 800 }}>
            Featured Products
          </h2>

          <div style={{ color: "#94a3b8", fontWeight: 600 }}>
            {filtered.length} products
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "22px",
          }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              style={{
                background: "#111827",
                borderRadius: "22px",
                overflow: "hidden",
                border: "1px solid #1e293b",
                transition: "0.3s",
                boxShadow: "0 10px 24px rgba(0,0,0,0.32)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 34px rgba(0,0,0,0.42)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 24px rgba(0,0,0,0.32)";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "white",
                    color: "#ef4444",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "11px",
                  }}
                >
                  20% OFF
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    background: wishlist.includes(p.id)
                      ? "#ef4444"
                      : "rgba(255,255,255,0.92)",
                    color: wishlist.includes(p.id) ? "white" : "#111827",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  ♥
                </button>
              </div>

              <div style={{ padding: "18px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "8px",
                    color: "#f59e0b",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  ⭐ 4.7 <span style={{ color: "#94a3b8" }}>(1.2k)</span>
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "8px",
                  }}
                >
                  {p.name}
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  Premium quality fashion product designed for comfort and
                  style.
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    ₹{p.price}
                  </span>

                  <span
                    style={{
                      color: "#64748b",
                      textDecoration: "line-through",
                      fontSize: "13px",
                    }}
                  >
                    ₹{Math.round(p.price * 1.25)}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    style={{
                      flex: 1,
                      background: "#111827",
                      color: "white",
                      border: "1px solid #374151",
                      padding: "11px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Add
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      buyNow(p);
                    }}
                    style={{
                      flex: 1,
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "11px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div
            onClick={() => setSelectedProduct(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2000,
              padding: "24px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#111827",
                borderRadius: "24px",
                overflow: "hidden",
                maxWidth: "900px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "1px solid #1e293b",
              }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  minHeight: "420px",
                }}
              />

              <div style={{ padding: "28px", color: "white" }}>
                <div style={{ color: "#f59e0b", marginBottom: "12px" }}>
                  ⭐ 4.7 (1.2k reviews)
                </div>

                <h2 style={{ fontSize: "32px", marginBottom: "14px" }}>
                  {selectedProduct.name}
                </h2>

                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "800",
                    marginBottom: "18px",
                  }}
                >
                  ₹{selectedProduct.price}
                </div>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 1.8,
                    marginBottom: "28px",
                  }}
                >
                  Premium quality fashion product designed for comfort,
                  performance and everyday style. Perfect for modern fashion
                  lovers.
                </p>

                <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    style={{
                      flex: 1,
                      background: "#111827",
                      color: "white",
                      border: "1px solid #374151",
                      padding: "14px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => buyNow(selectedProduct)}
                    style={{
                      flex: 1,
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "14px",
                      borderRadius: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{
                    width: "100%",
                    background: "#1e293b",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer
        style={{
          background: "#0f172a",
          borderTop: "1px solid #1e293b",
          marginTop: "48px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "40px 24px",
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          © 2026 Trendora. All rights reserved.
        </div>
      </footer>
    </div>
  );
}