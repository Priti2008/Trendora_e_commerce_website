import { useState } from "react";
import Navbar from "./components/Navbar";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Men",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    category: "Men",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Puma Runner",
    category: "Men",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Apple Watch",
    category: "Accessories",
    price: 24999,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "RayBan Sunglasses",
    category: "Accessories",
    price: 6499,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Denim Jacket",
    category: "Women",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart`);
  };

  return (
    <div
      style={{
        background: "#0b1220",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        searchTerm={search}
        setSearchTerm={setSearch}
      />

      {/* Hero Banner */}
      <div
        style={{
          height: "320px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.55)",
            padding: "30px 40px",
            borderRadius: "20px",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>
            Premium Fashion
          </h1>

          <p style={{ color: "#e5e7eb", marginBottom: "20px" }}>
            Discover stylish sneakers, watches and accessories.
          </p>

          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px" }}>
        <h2 style={{ marginBottom: "20px" }}>Featured Products</h2>

        {/* Category Buttons */}
        <div style={{ marginBottom: "24px" }}>
          {["All", "Men", "Women", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                marginRight: "10px",
                padding: "10px 18px",
                borderRadius: "20px",
                border: "1px solid #334155",
                background:
                  selectedCategory === cat ? "#2563eb" : "#111827",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProduct(p)}
              style={{
                background: "#111827",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #1e293b",
                cursor: "pointer",
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: wishlist.includes(p.id)
                      ? "#ef4444"
                      : "white",
                    color: wishlist.includes(p.id)
                      ? "white"
                      : "#111827",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ♥
                </button>
              </div>

              <div style={{ padding: "18px" }}>
                <h3 style={{ marginBottom: "6px" }}>{p.name}</h3>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {p.category}
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "14px",
                  }}
                >
                  ₹{p.price}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                  style={{
                    width: "100%",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Popup */}
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

                <div style={{ color: "#94a3b8", marginBottom: "10px" }}>
                  {selectedProduct.category}
                </div>

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

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "24px",
          color: "#94a3b8",
          borderTop: "1px solid #1e293b",
          marginTop: "40px",
        }}
      >
        © 2026 Trendora. All rights reserved.
      </div>
    </div>
  );
}