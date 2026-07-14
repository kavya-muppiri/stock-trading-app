import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiArrowUp, FiArrowDown, FiX } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";
import axiosInstance from "../api/axiosInstance";

const Home = () => {
  const { user, stocks, setPortfolio, setTransactions, setUser } = useGeneralContext();
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderType, setOrderType] = useState("BUY");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  const filteredStocks = stocks.filter(
    (s) =>
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const openOrderModal = (stock, type) => {
    setSelectedStock(stock);
    setOrderType(type);
    setQty(1);
    setMessage("");
  };

  const closeModal = () => {
    setSelectedStock(null);
    setMessage("");
  };

  const handlePlaceOrder = async () => {
    if (!selectedStock || qty <= 0) return;
    const totalCost = selectedStock.price * qty;

    try {
      await axiosInstance.post("/orders", {
        symbol: selectedStock.symbol,
        type: orderType,
        qty,
        price: selectedStock.price,
      });
    } catch (err) {
      // backend unavailable, proceed with local mock update
    }

    setTransactions((prev) => [
      {
        id: `t${Date.now()}`,
        symbol: selectedStock.symbol,
        type: orderType,
        qty,
        price: selectedStock.price,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setPortfolio((prev) => {
      const existing = prev.find((p) => p.symbol === selectedStock.symbol);
      if (orderType === "BUY") {
        if (existing) {
          const newQty = existing.qty + qty;
          const newAvg = (existing.avgPrice * existing.qty + selectedStock.price * qty) / newQty;
          return prev.map((p) =>
            p.symbol === selectedStock.symbol ? { ...p, qty: newQty, avgPrice: newAvg } : p
          );
        }
        return [
          ...prev,
          {
            symbol: selectedStock.symbol,
            name: selectedStock.name,
            qty,
            avgPrice: selectedStock.price,
            currentPrice: selectedStock.price,
          },
        ];
      } else {
        if (existing) {
          const remaining = existing.qty - qty;
          if (remaining <= 0) {
            return prev.filter((p) => p.symbol !== selectedStock.symbol);
          }
          return prev.map((p) =>
            p.symbol === selectedStock.symbol ? { ...p, qty: remaining } : p
          );
        }
        return prev;
      }
    });

    if (user) {
      const delta = orderType === "BUY" ? -totalCost : totalCost;
      setUser({ ...user, balance: Number(user.balance || 0) + delta });
    }

    setMessage(`${orderType} order placed successfully for ${qty} share(s) of ${selectedStock.symbol}.`);
    setTimeout(() => closeModal(), 1200);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 768px) {
          .sb-stock-table th:nth-child(3), .sb-stock-table td:nth-child(3) { display: none; }
        }
      `}</style>

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Welcome{user ? `, ${user.name}` : ""}</h2>
          <p style={styles.subtitle}>Browse the market and place paper trades.</p>
        </div>
        <div style={styles.searchBox}>
          <FiSearch size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table className="sb-stock-table" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Symbol</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Change</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.map((stock) => (
              <tr key={stock.symbol} style={styles.tr}>
                <td style={styles.td}>
                  <Link to={`/stock/${stock.symbol}`} style={styles.symbolLink}>
                    {stock.symbol}
                  </Link>
                </td>
                <td style={styles.td}>{stock.name}</td>
                <td style={styles.td}>₹{stock.price.toLocaleString("en-IN")}</td>
                <td style={{ ...styles.td, color: stock.change >= 0 ? "#16a34a" : "#dc2626" }}>
                  <span style={styles.changeCell}>
                    {stock.change >= 0 ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />}
                    {Math.abs(stock.change)}%
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.buyBtn} onClick={() => openOrderModal(stock, "BUY")}>Buy</button>
                  <button style={styles.sellBtn} onClick={() => openOrderModal(stock, "SELL")}>Sell</button>
                </td>
              </tr>
            ))}
            {filteredStocks.length === 0 && (
              <tr>
                <td colSpan={5} style={styles.emptyRow}>No stocks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedStock && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {orderType} {selectedStock.symbol}
              </h3>
              <button style={styles.closeBtn} onClick={closeModal}>
                <FiX size={20} />
              </button>
            </div>
            <p style={styles.modalPrice}>Market Price: ₹{selectedStock.price.toLocaleString("en-IN")}</p>
            <label style={styles.label}>Quantity</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={styles.qtyInput}
            />
            <p style={styles.totalText}>
              Total: ₹{(selectedStock.price * qty).toLocaleString("en-IN")}
            </p>
            {message && <p style={styles.successMsg}>{message}</p>}
            <button
              style={{
                ...styles.confirmBtn,
                background: orderType === "BUY" ? "#22c55e" : "#ef4444",
              }}
              onClick={handlePlaceOrder}
            >
              Confirm {orderType}
            </button>
          </div>
        </div>
      )}
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
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "8px 14px",
    minWidth: "220px",
  },
  searchInput: { border: "none", outline: "none", flex: 1, fontSize: "14px" },
  tableWrap: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "auto",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "600px" },
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
  changeCell: { display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 },
  buyBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    marginRight: "8px",
  },
  sellBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  emptyRow: { textAlign: "center", padding: "24px", color: "#94a3b8" },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "16px",
  },
  modal: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    width: "100%",
    maxWidth: "360px",
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: "18px", fontWeight: 700, margin: 0, color: "#0f172a" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#64748b" },
  modalPrice: { color: "#64748b", fontSize: "14px", margin: "8px 0 16px" },
  label: { fontSize: "13px", color: "#334155", fontWeight: 600 },
  qtyInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    marginTop: "6px",
    marginBottom: "12px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  totalText: { fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "16px" },
  successMsg: { color: "#16a34a", fontSize: "13px", marginBottom: "12px" },
  confirmBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Home;
