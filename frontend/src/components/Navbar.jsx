export default function Navbar({
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #1f2937",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0, color: "white" }}>🛍️ Trendora</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "320px",
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #374151",
          background: "#0b1220",
          color: "white",
          outline: "none",
        }}
      />

      {/* Right side */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          color: "white",
        }}
      >
        <a
          href="/login"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login
        </a>

        <a
          href="/register"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register
        </a>

        <span style={{ fontWeight: "bold" }}>
          ❤️ {wishlistCount}
        </span>

        <span style={{ fontWeight: "bold" }}>
          🛒 {cartCount}
        </span>
      </div>
    </div>
  );
}