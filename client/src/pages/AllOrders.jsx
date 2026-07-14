import React, { useState, useMemo } from "react";
import { FiArrowUp, FiArrowDown, FiCheck, FiX, FiList } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";
import axiosInstance from "../api/axiosInstance";

const AllOrders = () => {
  const { orders, setOrders } = useGeneralContext();
  const [filter, setFilter] = useState("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return orders;
    return orders.filter((o) => o.status === filter);
  }, [orders, filter]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filtered]
  );

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/admin/orders/${id}`, { status });
    } catch (err) {
      // backend unavailable, update locally
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>All Orders</h2>
          <p style={styles.subtitle}>Review and manage orders placed across the platform.</p>
        </div>
        <div style={styles.filterGroup}>
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.tableWrap}>
        {sorted.length === 0 ? (
          <div style={styles.emptyState}>
            <FiList size={32} color="#94a3b8" />
            <p>No orders found.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((o) => (
                <tr key={o.id} style={styles.tr}>
                  <td style={styles.td}>{formatDate(o.date)}</td>
                  <td style={{ ...styles.td, fontWeight: 700 }}>{o.symbol}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background: o.type === "BUY" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                        color: o.type === "BUY" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {o.type === "BUY" ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
                      {o.type}
                    </span>
                  </td>
                  <td style={styles.td}>{o.qty}</td>
                  <td style={styles.td}>₹{o.price.toLocaleString("en-IN")}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background:
                          o.status === "PENDING"
                            ? "rgba(245,158,11,0.1)"
                            : o.status === "APPROVED"
                            ? "rgba(34,197,94,0.1)"
                            : "rgba(239,68,68,0.1)",
                        color:
                          o.status === "PENDING" ? "#d97706" : o.status === "APPROVED" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {o.status === "PENDING" ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button style={styles.approveBtn} onClick={() => updateStatus(o.id, "APPROVED")}>
                          <FiCheck size={14} />
                        </button>
                        <button style={styles.rejectBtn} onClick={() => updateStatus(o.id, "REJECTED")}>
                          <FiX size={14} />
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: "12.5px" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "20px",
  },
  title: { fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  filterGroup: { display: "flex", gap: "8px", background: "#e2e8f0", borderRadius: "10px", padding: "4px", flexWrap: "wrap" },
  filterBtn: {
    border: "none",
    background: "transparent",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12.5px",
    fontWeight: 600,
    color: "#475569",
    cursor: "pointer",
  },
  filterBtnActive: { background: "#fff", color: "#0f172a", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" },
  tableWrap: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "auto",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "760px" },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: "12px",
    textTransform: "uppercase",
    color: "#64748b",
    borderBottom: "1px solid #e2e8f0",
  },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "14px 16px", fontSize: "14px", color: "#0f172a" },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 700,
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11.5px",
    fontWeight: 700,
  },
  approveBtn: {
    background: "rgba(34,197,94,0.1)",
    color: "#16a34a",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  rejectBtn: {
    background: "rgba(239,68,68,0.1)",
    color: "#dc2626",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "48px 24px",
    color: "#64748b",
  },
};

export default AllOrders;
