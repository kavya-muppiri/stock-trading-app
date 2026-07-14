import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiList, FiRepeat, FiBarChart2, FiTrendingUp } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";

const Admin = () => {
  const { allUsers, orders, transactions, stocks } = useGeneralContext();

  const stats = useMemo(
    () => [
      {
        label: "Total Users",
        value: allUsers.length,
        icon: <FiUsers size={20} color="#3b82f6" />,
        link: "/admin/users",
      },
      {
        label: "Pending Orders",
        value: orders.filter((o) => o.status === "PENDING").length,
        icon: <FiList size={20} color="#f59e0b" />,
        link: "/admin/orders",
      },
      {
        label: "Total Transactions",
        value: transactions.length,
        icon: <FiRepeat size={20} color="#a855f7" />,
        link: "/admin/transactions",
      },
      {
        label: "Listed Stocks",
        value: stocks.length,
        icon: <FiBarChart2 size={20} color="#22c55e" />,
        link: "/admin/stocks",
      },
    ],
    [allUsers, orders, transactions, stocks]
  );

  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 900px) {
          .sb-admin-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .sb-admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={styles.headerRow}>
        <FiTrendingUp size={22} color="#22c55e" />
        <div>
          <h2 style={styles.title}>Admin Dashboard</h2>
          <p style={styles.subtitle}>Overview and management of SB Stocks platform.</p>
        </div>
      </div>

      <div className="sb-admin-grid" style={styles.statsGrid}>
        {stats.map((s) => (
          <Link to={s.link} key={s.label} style={styles.statCard}>
            <div style={styles.iconWrap}>{s.icon}</div>
            <div>
              <p style={styles.statLabel}>{s.label}</p>
              <p style={styles.statValue}>{s.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={styles.linksCard}>
        <h4 style={styles.linksTitle}>Quick Actions</h4>
        <div style={styles.linksRow}>
          <Link to="/admin/stocks" style={styles.actionLink}>Manage Stock Charts</Link>
          <Link to="/admin/users" style={styles.actionLink}>View All Users</Link>
          <Link to="/admin/orders" style={styles.actionLink}>View All Orders</Link>
          <Link to="/admin/transactions" style={styles.actionLink}>View All Transactions</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
  headerRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" },
  title: { fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
  },
  iconWrap: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: { fontSize: "12.5px", color: "#64748b", margin: 0 },
  statValue: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0" },
  linksCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "22px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  linksTitle: { fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 14px" },
  linksRow: { display: "flex", flexWrap: "wrap", gap: "10px" },
  actionLink: {
    background: "#f1f5f9",
    color: "#0f172a",
    padding: "10px 16px",
    borderRadius: "10px",
    fontSize: "13.5px",
    fontWeight: 600,
    textDecoration: "none",
  },
};

export default Admin;
