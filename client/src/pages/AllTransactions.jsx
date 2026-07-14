import React, { useState, useMemo } from "react";
import { FiArrowUp, FiArrowDown, FiRepeat, FiSearch } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";

const AllTransactions = () => {
  const { transactions, allUsers } = useGeneralContext();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const enriched = useMemo(
    () =>
      transactions.map((t, idx) => ({
        ...t,
        user: allUsers[idx % allUsers.length]?.name || "Unknown User",
      })),
    [transactions, allUsers]
  );

  const filtered = useMemo(() => {
    let result = enriched;
    if (filter !== "ALL") {
      result = result.filter((t) => t.type === filter);
    }
    if (search) {
      result = result.filter(
        (t) =>
          t.symbol.toLowerCase().includes(search.toLowerCase()) ||
          t.user.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [enriched, filter, search]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filtered]
  );

  const totalVolume = useMemo(
    () => transactions.reduce((sum, t) => sum + t.qty * t.price, 0),
    [transactions]
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
          <h2 style={styles.title}>All Transactions</h2>
          <p style={styles.subtitle}>Platform-wide trading activity.</p>
        </div>
        <div style={styles.summaryBox}>
          <FiRepeat size={18} color="#22c55e" />
          <div>
            <p style={styles.summaryLabel}>Total Volume</p>
            <p style={styles.summaryValue}>₹{totalVolume.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>

      <div style={styles.controlsRow}>
        <div style={styles.searchBox}>
          <FiSearch size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by stock or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterGroup}>
          {["ALL", "BUY", "SELL"].map((f) => (
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
            <FiRepeat size={32} color="#94a3b8" />
            <p>No transactions found.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>User</th>
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
                  <td style={styles.td}>{t.user}</td>
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
  summaryBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    borderRadius: "12px",
    padding: "12px 18px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  summaryLabel: { fontSize: "11.5px", color: "#64748b", margin: 0 },
  summaryValue: { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0" },
  controlsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "16px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "8px 14px",
    minWidth: "240px",
    flex: 1,
  },
  searchInput: { border: "none", outline: "none", flex: 1, fontSize: "14px" },
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
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "48px 24px",
    color: "#64748b",
  },
};

export default AllTransactions;
