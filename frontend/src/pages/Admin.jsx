import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser && (currentUser.role === "admin" || currentUser.email === "admin@trendora.com");

  const [activeTab, setActiveTab] = useState("orders"); // "orders" | "users"
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch Admin Data
  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [resOrders, resUsers] = await Promise.all([
        fetch("http://localhost:5000/api/admin/orders"),
        fetch("http://localhost:5000/api/admin/users")
      ]);

      if (resOrders.ok) {
        const dataOrders = await resOrders.json();
        setOrders(dataOrders.orders || []);
      }

      if (resUsers.ok) {
        const dataUsers = await resUsers.json();
        setUsers(dataUsers.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Order Status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Calculate Metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;

  if (!isAdmin) {
    return (
      <div style={{ ...styles.pageContainer, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: "20px" }}>
        <div style={{ background: "#1e293b", padding: "40px", borderRadius: "20px", border: "1px solid #334155", maxWidth: "420px", width: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
          <h2 style={{ color: "#ffffff", margin: "0 0 10px 0", fontSize: "24px", fontWeight: "800" }}>Admin Access Required</h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "24px", lineHeight: "1.5" }}>
            This page is restricted to Store Administrators. Please log in with your Admin credentials (<strong style={{ color: "#38bdf8" }}>admin@trendora.com</strong>) to continue.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => navigate("/login")} style={{ ...styles.btnSecondary, background: "#2563eb" }}>
              🔑 Admin Login
            </button>
            <button onClick={() => navigate("/")} style={styles.btnSecondary}>
              🛍️ Return to Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoGroup}>
            <div style={styles.badge}>ADMIN</div>
            <h1 style={styles.title}>Trendora Control Center</h1>
          </div>
          <div style={styles.navButtons}>
            <button onClick={() => navigate("/")} style={styles.btnSecondary}>
              🛍️ View Store
            </button>
          </div>
        </div>
      </header>

      <main style={styles.mainContent}>
        {/* Metric Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>💰</div>
            <div>
              <p style={styles.statLabel}>Total Sales</p>
              <h3 style={styles.statValue}>₹{totalSales.toLocaleString()}</h3>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📦</div>
            <div>
              <p style={styles.statLabel}>Total Orders</p>
              <h3 style={styles.statValue}>{totalOrders}</h3>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div>
              <p style={styles.statLabel}>Registered Users</p>
              <h3 style={styles.statValue}>{totalUsers}</h3>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🛍️</div>
            <div>
              <p style={styles.statLabel}>Active Products</p>
              <h3 style={styles.statValue}>12</h3>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <button
            onClick={() => setActiveTab("orders")}
            style={activeTab === "orders" ? styles.tabActive : styles.tabInactive}
          >
            📦 Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            style={activeTab === "users" ? styles.tabActive : styles.tabInactive}
          >
            👥 Registered Users ({users.length})
          </button>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div style={styles.loadingBox}>Loading Dashboard Data...</div>
        ) : (
          <>
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div style={styles.tableCard}>
                <h2 style={styles.sectionTitle}>Order Management</h2>
                {orders.length === 0 ? (
                  <p style={styles.emptyText}>No orders recorded yet.</p>
                ) : (
                  <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Order ID</th>
                          <th style={styles.th}>Customer</th>
                          <th style={styles.th}>Items</th>
                          <th style={styles.th}>Total</th>
                          <th style={styles.th}>Date</th>
                          <th style={styles.th}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} style={styles.tr}>
                            <td style={{ ...styles.td, fontWeight: "700", color: "#2563eb" }}>
                              {order.id}
                            </td>
                            <td style={styles.td}>
                              <div style={{ fontWeight: "600" }}>
                                {order.customer?.name || "Guest"}
                              </div>
                              <div style={{ fontSize: "12px", color: "#64748b" }}>
                                {order.customer?.email || "N/A"}
                              </div>
                            </td>
                            <td style={styles.td}>
                              {order.items && order.items.length > 0
                                ? order.items.map((i, idx) => (
                                    <div key={idx} style={{ fontSize: "13px" }}>
                                      • {i.name} (x{i.quantity || 1})
                                    </div>
                                  ))
                                : "N/A"}
                            </td>
                            <td style={{ ...styles.td, fontWeight: "700" }}>
                              ₹{order.total?.toLocaleString()}
                            </td>
                            <td style={styles.td}>{order.createdAt || "Recent"}</td>
                            <td style={styles.td}>
                              <select
                                value={order.status || "Confirmed"}
                                disabled={updatingId === order.id}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                style={getStatusStyle(order.status)}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === "users" && (
              <div style={styles.tableCard}>
                <h2 style={styles.sectionTitle}>Registered Customers</h2>
                {users.length === 0 ? (
                  <p style={styles.emptyText}>No users registered yet.</p>
                ) : (
                  <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>User ID</th>
                          <th style={styles.th}>Full Name</th>
                          <th style={styles.th}>Email Address</th>
                          <th style={styles.th}>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr key={u.id} style={styles.tr}>
                            <td style={styles.td}>#{u.id}</td>
                            <td style={{ ...styles.td, fontWeight: "600" }}>{u.name}</td>
                            <td style={styles.td}>{u.email}</td>
                            <td style={styles.td}>
                              <span style={styles.roleBadge}>
                                {u.role || "Customer"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// Helpers
function getStatusStyle(status) {
  const base = {
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "12px",
    border: "none",
    cursor: "pointer",
    outline: "none"
  };

  switch (status) {
    case "Shipped":
      return { ...base, background: "#dbeafe", color: "#1e40af" };
    case "Delivered":
      return { ...base, background: "#dcfce7", color: "#166534" };
    case "Cancelled":
      return { ...base, background: "#fee2e2", color: "#991b1b" };
    default:
      return { ...base, background: "#fef3c7", color: "#92400e" };
  }
}

// Styles
const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
    paddingBottom: "40px"
  },
  header: {
    backgroundColor: "#1e293b",
    borderBottom: "1px solid #334155",
    padding: "20px 40px"
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },
  badge: {
    background: "linear-gradient(135deg, #ef4444, #f97316)",
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "6px",
    letterSpacing: "1px"
  },
  title: {
    fontSize: "22px",
    fontWeight: "800",
    margin: "0",
    color: "#ffffff"
  },
  btnSecondary: {
    background: "#334155",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "30px auto 0",
    padding: "0 20px"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  statCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },
  statIcon: {
    fontSize: "28px",
    background: "#0f172a",
    padding: "12px",
    borderRadius: "12px"
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: "13px",
    margin: "0 0 4px 0"
  },
  statValue: {
    fontSize: "22px",
    fontWeight: "800",
    margin: "0",
    color: "#ffffff"
  },
  tabContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px"
  },
  tabActive: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "700",
    cursor: "pointer"
  },
  tabInactive: {
    background: "#1e293b",
    color: "#94a3b8",
    border: "1px solid #334155",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer"
  },
  loadingBox: {
    textAlign: "center",
    padding: "60px",
    background: "#1e293b",
    borderRadius: "16px",
    color: "#94a3b8"
  },
  tableCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "24px"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginTop: "0",
    marginBottom: "20px",
    color: "#ffffff"
  },
  emptyText: {
    color: "#94a3b8",
    textAlign: "center",
    padding: "30px 0"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left"
  },
  th: {
    padding: "14px 16px",
    borderBottom: "1px solid #334155",
    color: "#94a3b8",
    fontSize: "13px",
    fontWeight: "700"
  },
  tr: {
    borderBottom: "1px solid #334155"
  },
  td: {
    padding: "16px",
    fontSize: "14px",
    color: "#e2e8f0"
  },
  roleBadge: {
    background: "#334155",
    color: "#38bdf8",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700"
  }
};
