import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const products = [
  {
    id: 1,
    name: "Air Max Elite",
    price: 4999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Street Runner",
    price: 4599,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Urban Force",
    price: 5199,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Pulse Watch",
    price: 7999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Classic Leather",
    price: 3799,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Sport Runner X",
    price: 4299,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Canvas Sneakers",
    price: 2899,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Premium Backpack",
    price: 2499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Urban Sunglasses",
    price: 1999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  },
];



  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(saved.length);
  }, []);

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = [...existing, product];
    localStorage.setItem("cart", JSON.stringify(updated));
    setCartCount(updated.length);
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
      setWishlistCount((c) => c - 1);
    } else {
      setWishlist([...wishlist, id]);
      setWishlistCount((c) => c + 1);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#FFF7F0",
        minHeight: "100vh",
        color: "#111827",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          height: "85vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,247,240,0.25), rgba(255,247,240,0.85))",
          }}
        />

        <div
          style={{
            position: "relative",
            textAlign: "center",
            maxWidth: 820,
            padding: "0 24px",
          }}
        >
          <p
            style={{
              color: "#F97316",
              letterSpacing: 3,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            NEW COLLECTION
          </p>

          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1,
              margin: 0,
              fontWeight: 900,
            }}
          >
            MOVE WITH <span style={{ color: "#F97316" }}>STYLE</span>
          </h1>

          <p
            style={{
              marginTop: 24,
              fontSize: 18,
              color: "#4B5563",
              lineHeight: 1.7,
            }}
          >
            Premium sneakers and accessories inspired by modern performance and
            minimalist fashion.
          </p>

          <div
            style={{
              marginTop: 38,
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "linear-gradient(135deg,#FB923C,#F97316)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 12px 30px rgba(249,115,22,0.35)",
              }}
            >
              Shop Now
            </button>

            <button
              style={{
                background: "rgba(255,255,255,0.7)",
                color: "#111827",
                border: "1px solid rgba(249,115,22,0.18)",
                padding: "14px 28px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </section>
            {/* ADVERTISEMENT BANNER */}
      <section style={{ padding: "48px 32px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            background: "linear-gradient(135deg,#FED7AA,#FDBA74)",
            borderRadius: 36,
            padding: "42px 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
            boxShadow: "0 20px 50px rgba(249,115,22,0.18)",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p
              style={{
                color: "#9A3412",
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              LIMITED OFFER
            </p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                margin: 0,
                color: "#111827",
                fontWeight: 800,
              }}
            >
              Get up to 40% off on selected collections
            </h2>

            <p
              style={{
                marginTop: 16,
                color: "#374151",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              Discover exclusive styles and premium essentials designed for
              comfort, movement, and everyday fashion.
            </p>
          </div>

          <button
            style={{
              background: "#111827",
              color: "white",
              border: "none",
              padding: "14px 26px",
              borderRadius: 999,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(17,24,39,0.18)",
            }}
          >
            Shop Deals
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: "16px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <p
              style={{
                color: "#F97316",
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              CATEGORIES
            </p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Explore by Style
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                title: "Sneakers",
                img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Apparel",
                img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Accessories",
                img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "New Arrivals",
                img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
              },
            ].map((cat) => (
              <div
                key={cat.title}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid rgba(249,115,22,0.12)",
                  boxShadow: "0 12px 28px rgba(15,23,42,0.06)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(249,115,22,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(15,23,42,0.06)";
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  style={{
                    width: "100%",
                    height: 190,
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div style={{ padding: 22 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    {cat.title}
                  </h3>

                  <p
                    style={{
                      marginTop: 8,
                      color: "#6B7280",
                      fontSize: 14,
                    }}
                  >
                    Curated premium collection
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: "16px 32px 96px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto 36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p
              style={{
                color: "#F97316",
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              FEATURED
            </p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Best Sellers
            </h2>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))",
            gap: 28,
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#FFFFFF",
                borderRadius: 32,
                overflow: "hidden",
                border: "1px solid rgba(249,115,22,0.12)",
                boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
                transition: "all 0.35s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 28px 56px rgba(249,115,22,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(15,23,42,0.08)";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: 320,
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.92)",
                    color: wishlist.includes(product.id)
                      ? "#EF4444"
                      : "#374151",
                    cursor: "pointer",
                    fontSize: 20,
                    boxShadow: "0 10px 24px rgba(15,23,42,0.12)",
                    transition: "all 0.25s ease",
                  }}
                >
                  ♥
                </button>
              </div>

              <div style={{ padding: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      color: "#F97316",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    TRENDING
                  </span>

                  <span
                    style={{
                      color: "#111827",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    ⭐ {product.rating}
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    color: "#6B7280",
                    lineHeight: 1.6,
                    fontSize: 14,
                    marginBottom: 18,
                  }}
                >
                  Lightweight comfort with a premium streetwear aesthetic
                  designed for everyday movement.
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    ₹{product.price}
                  </span>

                  <button
                    onClick={(ev) => {
                      ev.stopPropagation();
                      addToCart(product);
                    }}
                    style={{
                      background:
                        "linear-gradient(135deg,#FB923C,#F97316)",
                      color: "white",
                      border: "none",
                      padding: "12px 22px",
                      borderRadius: 999,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow:
                        "0 12px 24px rgba(249,115,22,0.24)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
           {/* NEWSLETTER SECTION */}
<section
  style={{
    width: "100%",
    boxSizing: "border-box",
    padding: "32px 20px 80px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      boxSizing: "border-box",
      background: "#FFFFFF",
      borderRadius: "36px",
      padding: "48px 24px",
      border: "1px solid rgba(249,115,22,0.12)",
      boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
      textAlign: "center",
    }}
  >
    <p
      style={{
        color: "#F97316",
        fontWeight: 700,
        letterSpacing: 1,
        margin: "0 0 12px",
      }}
    >
      NEWSLETTER
    </p>

    <h2
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        fontSize: "clamp(2rem, 5vw, 3rem)",
        lineHeight: 1.15,
        fontWeight: 800,
        color: "#111827",
        overflowWrap: "break-word",
      }}
    >
      Stay ahead of the trend
    </h2>

    <p
      style={{
        width: "100%",
        maxWidth: "640px",
        margin: "16px auto 28px",
        color: "#6B7280",
        lineHeight: 1.7,
        fontSize: "15px",
        overflowWrap: "break-word",
      }}
    >
      Get exclusive drops, early access to new collections, and premium
      fashion updates delivered directly to your inbox.
    </p>

    <div
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
        style={{
          width: "100%",
          maxWidth: "360px",
          minWidth: 0,
          boxSizing: "border-box",
          padding: "16px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(249,115,22,0.18)",
          outline: "none",
          fontSize: "15px",
          background: "#FFF7F0",
          color: "#111827",
        }}
      />

      <button
        type="button"
        style={{
          width: "100%",
          maxWidth: "150px",
          padding: "16px 24px",
          borderRadius: "999px",
          border: "none",
          background: "#F97316",
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 10px 24px rgba(249,115,22,0.25)",
        }}
      >
        Subscribe
      </button>
    </div>
  </div>
</section>

      {/* FINAL CTA */}
      <section style={{ padding: "0 32px 72px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            borderRadius: 40,
            overflow: "hidden",
            position: "relative",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 320,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(17,24,39,0.78), rgba(17,24,39,0.38))",
            }}
          />

          <div
            style={{
              position: "relative",
              padding: "40px",
              maxWidth: 560,
              color: "white",
            }}
          >
            <p
              style={{
                color: "#FDBA74",
                fontWeight: 700,
                letterSpacing: 1,
                marginBottom: 10,
              }}
            >
              TRENDORA EXCLUSIVE
            </p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                margin: 0,
                lineHeight: 1.1,
                fontWeight: 800,
              }}
            >
              Crafted for comfort. Designed for impact.
            </h2>

            <p
              style={{
                marginTop: 16,
                color: "#E5E7EB",
                lineHeight: 1.7,
                fontSize: 15,
              }}
            >
              Discover premium fashion that blends performance, minimalism, and
              everyday confidence.
            </p>

            <button
              style={{
                marginTop: 24,
                background: "#FFFFFF",
                color: "#111827",
                border: "none",
                padding: "14px 24px",
                borderRadius: 999,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
              }}
            >
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}