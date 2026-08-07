import { useNavigate } from "react-router-dom";

export default function Navbar({
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(18px)",
        background: "rgba(255,248,242,0.88)",
        borderBottom: "1px solid rgba(251,146,60,0.18)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        {/* Brand */}
        <div
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#FB923C,#F97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              boxShadow: "0 10px 24px rgba(249,115,22,0.25)",
            }}
          >
            T
          </div>

          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1,
              }}
            >
              Trendora
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                marginTop: 2,
                letterSpacing: 0.5,
              }}
            >
              Fashion & Lifestyle
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
                fontSize: 15,
              }}
            >
              🔍
            </span>

            <input
              type="text"
              placeholder="Search sneakers, apparel, accessories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px 14px 42px",
                borderRadius: 999,
                border: "1px solid rgba(251,146,60,0.18)",
                background: "rgba(255,255,255,0.9)",
                color: "#111827",
                outline: "none",
                fontSize: 15,
                boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {user ? (
            <>
              <button
                onClick={() => navigate("/orders")}
                style={{
                  border: "1px solid rgba(251,146,60,0.18)",
                  background: "white",
                  color: "#111827",
                  padding: "10px 14px",
                  borderRadius: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
                }}
              >
                Orders
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "white",
                  padding: "8px 12px",
                  borderRadius: 16,
                  border: "1px solid rgba(251,146,60,0.18)",
                  boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#FDBA74,#FB923C)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      lineHeight: 1,
                    }}
                  >
                    Welcome
                  </span>

                  <span
                    style={{
                      fontSize: 14,
                      color: "#111827",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {user.name}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                style={{
                  background: "linear-gradient(135deg,#FB923C,#F97316)",
                  color: "white",
                  border: "none",
                  padding: "11px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(249,115,22,0.25)",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{
                  border: "1px solid rgba(251,146,60,0.18)",
                  background: "white",
                  color: "#111827",
                  padding: "11px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
                }}
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  background: "linear-gradient(135deg,#FB923C,#F97316)",
                  color: "white",
                  border: "none",
                  padding: "11px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(249,115,22,0.25)",
                }}
              >
                Register
              </button>
            </>
          )}

          {/* Wishlist */}
          <button
            style={{
              position: "relative",
              width: 46,
              height: 46,
              borderRadius: 16,
              border: "1px solid rgba(251,146,60,0.18)",
              background: "white",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
              fontSize: 18,
            }}
          >
            ❤️

            {wishlistCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#EF4444",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  minWidth: 20,
                  height: 20,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            style={{
              position: "relative",
              width: 46,
              height: 46,
              borderRadius: 16,
              border: "1px solid rgba(251,146,60,0.18)",
              background: "white",
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(15,23,42,0.05)",
              fontSize: 18,
            }}
          >
            🛒

            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#2563EB",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  minWidth: 20,
                  height: 20,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}