import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiArrowUp, FiArrowDown, FiBriefcase } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useGeneralContext } from "../context/GeneralContext";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#14b8a6"];

const Portfolio = () => {
  const { portfolio, user } = useGeneralContext();

  const enrichedHoldings = useMemo(
    () =>
      portfolio.map((h) => {
        const invested = h.avgPrice * h.qty;
        const current = h.currentPrice * h.qty;
        const pnl = current - invested;
        const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0;
        return { ...h, invested, current, pnl, pnlPercent };
      }),
    [portfolio]
  );

  const totals = useMemo(() => {
    const invested = enrichedHoldings.reduce((sum, h) => sum + h.invested, 0);
    const current = enrichedHoldings.reduce((sum, h) => sum + h.current, 0);
    const pnl = current - invested;
    return { invested, current, pnl };
  }, [enrichedHoldings]);

  const pieData = enrichedHoldings.map((h) => ({ name: h.symbol, value: h.current }));

  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 900px) {
          .sb-portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <h2 style={styles.title}>My Portfolio</h2>
      <p style={styles.subtitle}>Track your holdings and overall performance.</p>

      <div style={styles.summaryGrid}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Available Balance</span>
          <span style={styles.summaryValue}>₹{Number(user?.balance || 0).toLocaleString("en-IN")}</span>
        </div>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Invested Value</span>
          <span style={styles.summaryValue}>₹{totals.invested.toLocaleString("en-IN")}</span>
        </div>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Current Value</span>
          <span style={styles.summaryValue}>₹{totals.current.toLocaleString("en-IN")}</span>
        </div>
        <div style={styles.summaryCard}>
          <span style={styles.summaryLabel}>Total P&L</span>
          <span style={{ ...styles.summaryValue, color: totals.pnl >= 0 ? "#16a34a" : "#dc2626" }}>
            {totals.pnl >= 0 ? "+" : ""}₹{totals.pnl.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="sb-portfolio-grid" style={styles.contentGrid}>
        <div style={styles.tableWrap}>
          {enrichedHoldings.length === 0 ? (
            <div style={styles.emptyState}>
              <FiBriefcase size={32} color="#94a3b8" />
              <p>You don't have any holdings yet.</p>
              <Link to="/home" style={styles.exploreLink}>Explore stocks</Link>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Avg. Price</th>
                  <th style={styles.th}>LTP</th>
                  <th style={styles.th}>P&L</th>
                </tr>
              </thead>
              <tbody>
                {enrichedHoldings.map((h) => (
                  <tr key={h.symbol} style={styles.tr}>
                    <td style={styles.td}>
                      <Link to={`/stock/${h.symbol}`} style={styles.symbolLink}>{h.symbol}</Link>
                    </td>
                    <td style={styles.td}>{h.qty}</td>
                    <td style={styles.td}>₹{h.avgPrice.toLocaleString("en-IN")}</td>
                    <td style={styles.td}>₹{h.currentPrice.toLocaleString("en-IN")}</td>
                    <td style={{ ...styles.td, color: h.pnl >= 0 ? "#16a34a" : "#dc2626" }}>
                      <span style={styles.pnlCell}>
                        {h.pnl >= 0 ? <FiArrowUp size={13} /> : <FiArrowDown size={13} />}
                        ₹{Math.abs(h.pnl).toFixed(2)} ({h.pnlPercent.toFixed(1)}%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {enrichedHoldings.length > 0 && (
          <div style={styles.chartCard}>
            <h4 style={styles.chartTitle}>Allocation</h4>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {pieData.map((entry, idx) => (
                    <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={styles.legendWrap}>
              {pieData.map((entry, idx) => (
                <div key={entry.name} style={styles.legendItem}>
                  <span style={{ ...styles.legendDot, background: COLORS[idx % COLORS.length] }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
  title: { fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px", marginBottom: "20px" },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  summaryCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  summaryLabel: { fontSize: "12.5px", color: "#64748b" },
  summaryValue: { fontSize: "19px", fontWeight: 700, color: "#0f172a" },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  },
  tableWrap: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "auto",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "500px" },
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
  symbolLink: { color: "#0f172a", fontWeight: 700, textDecoration: "none" },
  pnlCell: { display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    padding: "48px 24px",
    color: "#64748b",
  },
  exploreLink: { color: "#22c55e", fontWeight: 600, textDecoration: "none", fontSize: "14px" },
  chartCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    height: "fit-content",
  },
  chartTitle: { fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" },
  legendWrap: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" },
  legendItem: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#334155" },
  legendDot: { width: "10px", height: "10px", borderRadius: "50%", display: "inline-block" },
};

export default Portfolio;
