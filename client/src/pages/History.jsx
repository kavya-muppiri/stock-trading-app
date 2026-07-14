import React, { useState, useMemo } from "react";
import { FiArrowUp, FiArrowDown, FiClock } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";

const History = () => {
  const { transactions } = useGeneralContext();
  const [filter, setFilter] = useState("ALL");

  const filtered = useMemo(() => {
    if (filter === "ALL") return transactions;
    return transactions.filter((t) => t.type === filter);
  }, [transactions, filter]);

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

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Transaction History</h2>
          <p style={styles.subtitle}>All your past buy and sell orders.</p>
        </div>
        <div style={styles.filterGroup}>
          {["ALL", "BUY", "SELL"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.tableWrap}>
        {sorted.length === 0 ? (
          <div style={styles.emptyState}>
            <FiClock size={32} color="#94a3b8" />
            <p>No transactions found.</p>
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
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t) => (
                <tr key={t.id} style={styles.tr}>
                  <td style={styles.td}>{formatDate(t.date)}</td>
                  <td style={{ ...styles.td, fontWeight: 700 }}>{t.symbol}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background: t.type === "BUY" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                        color: t.type === "BUY" ? "#16a34a" : "#dc2626",
                      }}
                    >
                      {t.type === "BUY" ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
                      {t.type}
                    </span>
                  </td>
                  <td style={styles.td}>{t.qty}</td>
                  <td style={styles.td}>₹{t.price.toLocaleString("en-IN")}</td>
                  <td style={styles.td}>₹{(t.qty * t.price).toLocaleString("en-IN")}</td>
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
  page: { padding: "24px", maxWidth: "1100px", margin: "0 auto" },
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
  filterGroup: { display: "flex", gap: "8px", background: "#e2e8f0", borderRadius: "10px", padding: "4px" },
  filterBtn: {
    border: "none",
    background: "transparent",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
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
  table: { width: "100%", borderCollapse: "collapse", minWidth: "640px" },
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
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "48px 24px",
    color: "#64748b",
  },
};

export default History;
