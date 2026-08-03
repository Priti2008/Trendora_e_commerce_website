export default function Navbar({
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

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
      <a
        href="/"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🛍️ Trendora
      </a>

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
        {user ? (
          <>
            <span
              style={{
                fontWeight: "bold",
                color: "#60a5fa",
              }}
            >
              👤 {user.name}
            </span>

            <a
              href="/orders"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Orders
            </a>

            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
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
          </>
        )}

        {/* Wishlist */}
        <span style={{ fontWeight: "bold" }}>
          ❤️ {wishlistCount}
        </span>

        {/* Cart */}
        <a
          href="/checkout"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🛒 {cartCount}
        </a>
      </div>
    </div>
  );
}