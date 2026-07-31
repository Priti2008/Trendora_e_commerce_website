import React from "react";

function Navbar({
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <nav
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontSize: "30px",
            fontWeight: "800",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Trendora
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            fontWeight: "600",
            color: "#cbd5e1",
          }}
        >
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            Home
          </span>

          <span
            onClick={() => window.scrollTo({ top: 360, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            Shop
          </span>

          <span
            onClick={() => window.scrollTo({ top: 360, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            Men
          </span>

          <span
            onClick={() => window.scrollTo({ top: 360, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            Women
          </span>

          <span
            onClick={() => window.scrollTo({ top: 360, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            Accessories
          </span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: "320px" }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "999px",
              border: "1px solid #334155",
              background: "#111827",
              color: "white",
              outline: "none",
            }}
          />
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "white",
            fontWeight: "600",
          }}
        >
          <span style={{ cursor: "pointer" }}>❤️ {wishlistCount}</span>

          <span style={{ cursor: "pointer" }}>🛒 {cartCount}</span>

          <span style={{ cursor: "pointer" }}>Login</span>

          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "999px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;