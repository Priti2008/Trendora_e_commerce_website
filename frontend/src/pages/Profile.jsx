import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view your profile.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        setUser(data.user);
      } catch (err) {
        console.error("Profile error:", err);

        setError(err.message || "Unable to load profile");

        // Remove invalid/expired token
        if (
          err.message === "Invalid or expired token" ||
          err.message === "Authorization token is required"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch("http://localhost:5000/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
          color: "#111827",
        }}
      >
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 20px",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
            }}
          >
            🔒
          </div>

          <h2
            style={{
              marginBottom: "10px",
              color: "#111827",
            }}
          >
            Login Required
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "25px",
            }}
          >
            {error}
          </p>

          <Link
            to="/login"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#f8fafc",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#2563eb",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            ACCOUNT
          </p>

          <h1
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "clamp(2rem, 5vw, 3rem)",
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
            }}
          >
            Manage your Trendora account and personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "35px",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              paddingBottom: "30px",
              borderBottom: "1px solid #e5e7eb",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                minWidth: "80px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                fontWeight: "800",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div>
              <h2
                style={{
                  margin: "0 0 5px",
                  color: "#111827",
                }}
              >
                {user?.name}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280",
                }}
              >
                Trendora Customer
              </p>
            </div>
          </div>

          {/* User Information */}
          <div>
            <h3
              style={{
                marginBottom: "20px",
                color: "#111827",
              }}
            >
              Personal Information
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "18px",
              }}
            >
              {/* Name */}
              <div
                style={{
                  padding: "18px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "6px",
                  }}
                >
                  FULL NAME
                </p>

                <p
                  style={{
                    color: "#111827",
                    fontWeight: "700",
                  }}
                >
                  {user?.name || "Not available"}
                </p>
              </div>

              {/* Email */}
              <div
                style={{
                  padding: "18px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "6px",
                  }}
                >
                  EMAIL ADDRESS
                </p>

                <p
                  style={{
                    color: "#111827",
                    fontWeight: "700",
                    wordBreak: "break-word",
                  }}
                >
                  {user?.email || "Not available"}
                </p>
              </div>

              {/* User ID */}
              <div
                style={{
                  padding: "18px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "6px",
                  }}
                >
                  USER ID
                </p>

                <p
                  style={{
                    color: "#111827",
                    fontWeight: "700",
                  }}
                >
                  {user?.id || "Not available"}
                </p>
              </div>

              {/* Account Status */}
              <div
                style={{
                  padding: "18px",
                  background: "#f0fdf4",
                  borderRadius: "14px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "6px",
                  }}
                >
                  ACCOUNT STATUS
                </p>

                <p
                  style={{
                    color: "#16a34a",
                    fontWeight: "700",
                  }}
                >
                  ● Active
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "30px",
              paddingTop: "25px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Link
              to="/orders"
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              View Orders
            </Link>

            <Link
              to="/"
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                background: "#f3f4f6",
                color: "#111827",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Continue Shopping
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                background: "#fee2e2",
                color: "#dc2626",
                fontWeight: "700",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;