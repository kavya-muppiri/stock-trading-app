import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUp, FiArrowDown, FiX } from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGeneralContext } from "../context/GeneralContext";
import axiosInstance from "../api/axiosInstance";

const RANGES = ["1D", "1W", "1M", "3M", "1Y"];

const generateHistory = (basePrice, points) => {
  const data = [];
  let price = basePrice * 0.9;
  for (let i = 0; i < points; i++) {
    const drift = (Math.random() - 0.48) * (basePrice * 0.015);
    price = Math.max(price + drift, basePrice * 0.6);
    data.push({
      label: `D${i + 1}`,
      price: Number(price.toFixed(2)),
    });
  }
  data[data.length - 1].price = basePrice;
  return data;
};

const StockChart = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { stocks, user, setPortfolio, setTransactions, setUser } = useGeneralContext();
  const [range, setRange] = useState("1M");
  const [orderType, setOrderType] = useState(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  const stock = useMemo(
    () => stocks.find((s) => s.symbol.toLowerCase() === String(symbol).toLowerCase()),
    [stocks, symbol]
  );

  const pointsForRange = { "1D": 24, "1W": 7, "1M": 30, "3M": 90, "1Y": 52 };
  const chartData = useMemo(
    () => generateHistory(stock ? stock.price : 1000, pointsForRange[range]),
    [stock, range]
  );

  if (!stock) {
    return (
      <div style={styles.page}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <FiArrowLeft size={16} /> Back
        </button>
        <p style={{ color: "#64748b", marginTop: "16px" }}>
          Stock "{symbol}" not found. <Link to="/home" style={styles.link}>Go back to Home</Link>
        </p>
      </div>
    );
  }

  const openOrder = (type) => {
    setOrderType(type);
    setQty(1);
    setMessage("");
  };

  const closeOrder = () => {
    setOrderType(null);
    setMessage("");
  };

  const handleConfirm = async () => {
    if (qty <= 0) return;
    const totalCost = stock.price * qty;

    try {
      await axiosInstance.post("/orders", {
        symbol: stock.symbol,
        type: orderType,
        qty,
        price: stock.price,
      });
    } catch (err) {
      // backend unavailable, proceed with local mock update
    }

    setTransactions((prev) => [
      {
        id: `t${Date.now()}`,
        symbol: stock.symbol,
        type: orderType,
        qty,
        price: stock.price,
        date: new Date().toISOString(),
      },
      ...prev,
    ]);

    setPortfolio((prev) => {
      const existing = prev.find((p) => p.symbol === stock.symbol);
      if (orderType === "BUY") {
        if (existing) {
          const newQty = existing.qty + qty;
          const newAvg = (existing.avgPrice * existing.qty + stock.price * qty) / newQty;
          return prev.map((p) =>
            p.symbol === stock.symbol ? { ...p, qty: newQty, avgPrice: newAvg } : p
          );
        }
        return [
          ...prev,
          { symbol: stock.symbol, name: stock.name, qty, avgPrice: stock.price, currentPrice: stock.price },
        ];
      } else {
        if (existing) {
          const remaining = existing.qty - qty;
          if (remaining <= 0) return prev.filter((p) => p.symbol !== stock.symbol);
          return prev.map((p) => (p.symbol === stock.symbol ? { ...p, qty: remaining } : p));
        }
        return prev;
      }
    });

    if (user) {
      const delta = orderType === "BUY" ? -totalCost : totalCost;
      setUser({ ...user, balance: Number(user.balance || 0) + delta });
    }

    setMessage(`${orderType} order placed for ${qty} share(s) of ${stock.symbol}.`);
    setTimeout(() => closeOrder(), 1200);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 900px) {
          .sb-chart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        <FiArrowLeft size={16} /> Back
      </button>

      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.symbol}>{stock.symbol}</h2>
          <p style={styles.stockName}>{stock.name}</p>
        </div>
        <div style={styles.priceBlock}>
          <span style={styles.price}>₹{stock.price.toLocaleString("en-IN")}</span>
          <span
            style={{
              ...styles.changeTag,
              color: stock.change >= 0 ? "#16a34a" : "#dc2626",
              background: stock.change >= 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            }}
          >
            {stock.change >= 0 ? <FiArrowUp size={13} /> : <FiArrowDown size={13} />}
            {Math.abs(stock.change)}%
          </span>
        </div>
      </div>

      <div className="sb-chart-layout" style={styles.layout}>
        <div style={styles.chartCard}>
          <div style={styles.rangeRow}>
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{ ...styles.rangeBtn, ...(range === r ? styles.rangeBtnActive : {}) }}
              >
                {r}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis
                domain={["auto", "auto"]}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickFormatter={(v) => `₹${v}`}
              />
              <Tooltip formatter={(v) => [`₹${v}`, "Price"]} />
              <Area type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} fill="url(#priceGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.actionCard}>
          <h4 style={styles.actionTitle}>Trade {stock.symbol}</h4>
          <p style={styles.actionSubtitle}>Available Balance: ₹{Number(user?.balance || 0).toLocaleString("en-IN")}</p>
          <button style={styles.buyBtn} onClick={() => openOrder("BUY")}>Buy</button>
          <button style={styles.sellBtn} onClick={() => openOrder("SELL")}>Sell</button>
        </div>
      </div>

      {orderType && (
        <div style={styles.modalOverlay} onClick={closeOrder}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{orderType} {stock.symbol}</h3>
              <button style={styles.closeBtn} onClick={closeOrder}><FiX size={20} /></button>
            </div>
            <p style={styles.modalPrice}>Market Price: ₹{stock.price.toLocaleString("en-IN")}</p>
            <label style={styles.label}>Quantity</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={styles.qtyInput}
            />
            <p style={styles.totalText}>Total: ₹{(stock.price * qty).toLocaleString("en-IN")}</p>
            {message && <p style={styles.successMsg}>{message}</p>}
            <button
              style={{ ...styles.confirmBtn, background: orderType === "BUY" ? "#22c55e" : "#ef4444" }}
              onClick={handleConfirm}
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
  page: { padding: "24px", maxWidth: "1100px", margin: "0 auto" },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    padding: 0,
    marginBottom: "16px",
  },
  link: { color: "#22c55e", fontWeight: 600, textDecoration: "none" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
  },
  symbol: { fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: 0 },
  stockName: { color: "#64748b", fontSize: "14px", marginTop: "2px" },
  priceBlock: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" },
  price: { fontSize: "24px", fontWeight: 700, color: "#0f172a" },
  changeTag: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "13px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "20px",
  },
  layout: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" },
  chartCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  rangeRow: { display: "flex", gap: "8px", marginBottom: "12px" },
  rangeBtn: {
    border: "1px solid #e2e8f0",
    background: "#fff",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12.5px",
    fontWeight: 600,
    color: "#475569",
    cursor: "pointer",
  },
  rangeBtnActive: { background: "#0f172a", color: "#fff", borderColor: "#0f172a" },
  actionCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    height: "fit-content",
  },
  actionTitle: { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px" },
  actionSubtitle: { fontSize: "12.5px", color: "#64748b", marginBottom: "16px" },
  buyBtn: {
    width: "100%",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  sellBtn: {
    width: "100%",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
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
  modal: { background: "#fff", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "360px" },
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

export default StockChart;
