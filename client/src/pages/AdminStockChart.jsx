import React, { useState, useMemo } from "react";
import { FiArrowUp, FiArrowDown, FiEdit2, FiPlus, FiX, FiSave } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGeneralContext } from "../context/GeneralContext";
import axiosInstance from "../api/axiosInstance";

const generateHistory = (basePrice) => {
  const data = [];
  let price = basePrice * 0.92;
  for (let i = 0; i < 20; i++) {
    const drift = (Math.random() - 0.45) * (basePrice * 0.02);
    price = Math.max(price + drift, basePrice * 0.5);
    data.push({ label: `D${i + 1}`, price: Number(price.toFixed(2)) });
  }
  data[data.length - 1].price = basePrice;
  return data;
};

const AdminStockChart = () => {
  const { stocks, setStocks } = useGeneralContext();
  const [selectedSymbol, setSelectedSymbol] = useState(stocks[0]?.symbol || "");
  const [editing, setEditing] = useState(false);
  const [priceInput, setPriceInput] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: "", name: "", price: "" });
  const [message, setMessage] = useState("");

  const selectedStock = useMemo(
    () => stocks.find((s) => s.symbol === selectedSymbol),
    [stocks, selectedSymbol]
  );

  const chartData = useMemo(
    () => generateHistory(selectedStock ? selectedStock.price : 1000),
    [selectedStock]
  );

  const startEdit = () => {
    setPriceInput(selectedStock ? String(selectedStock.price) : "");
    setEditing(true);
  };

  const handleUpdatePrice = async () => {
    const newPrice = Number(priceInput);
    if (!newPrice || newPrice <= 0) return;

    try {
      await axiosInstance.put(`/admin/stocks/${selectedSymbol}`, { price: newPrice });
    } catch (err) {
      // backend unavailable, update locally
    }

    setStocks((prev) =>
      prev.map((s) => {
        if (s.symbol !== selectedSymbol) return s;
        const change = Number((((newPrice - s.price) / s.price) * 100).toFixed(2));
        return { ...s, price: newPrice, change };
      })
    );
    setEditing(false);
    setMessage(`Updated price for ${selectedSymbol}.`);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleAddStock = async () => {
    if (!newStock.symbol || !newStock.name || !newStock.price) return;
    const stockToAdd = {
      symbol: newStock.symbol.toUpperCase(),
      name: newStock.name,
      price: Number(newStock.price),
      change: 0,
    };

    try {
      await axiosInstance.post("/admin/stocks", stockToAdd);
    } catch (err) {
      // backend unavailable, add locally
    }

    setStocks((prev) => [...prev, stockToAdd]);
    setSelectedSymbol(stockToAdd.symbol);
    setNewStock({ symbol: "", name: "", price: "" });
    setShowAddModal(false);
    setMessage(`Added new stock ${stockToAdd.symbol}.`);
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 900px) {
          .sb-admin-chart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Manage Stock Charts</h2>
          <p style={styles.subtitle}>Update stock prices and add new listings.</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowAddModal(true)}>
          <FiPlus size={16} /> Add Stock
        </button>
      </div>

      {message && <div style={styles.successMsg}>{message}</div>}

      <div className="sb-admin-chart-layout" style={styles.layout}>
        <div style={styles.listCard}>
          {stocks.map((s) => (
            <button
              key={s.symbol}
              onClick={() => {
                setSelectedSymbol(s.symbol);
                setEditing(false);
              }}
              style={{
                ...styles.listItem,
                ...(selectedSymbol === s.symbol ? styles.listItemActive : {}),
              }}
            >
              <span style={styles.listSymbol}>{s.symbol}</span>
              <span style={{ color: s.change >= 0 ? "#16a34a" : "#dc2626", fontSize: "12.5px", fontWeight: 600 }}>
                {s.change >= 0 ? <FiArrowUp size={11} /> : <FiArrowDown size={11} />} {Math.abs(s.change)}%
              </span>
            </button>
          ))}
        </div>

        <div style={styles.chartCard}>
          {selectedStock ? (
            <>
              <div style={styles.chartHeader}>
                <div>
                  <h3 style={styles.chartSymbol}>{selectedStock.symbol}</h3>
                  <p style={styles.chartName}>{selectedStock.name}</p>
                </div>
                {!editing ? (
                  <button style={styles.editBtn} onClick={startEdit}>
                    <FiEdit2 size={14} /> Edit Price
                  </button>
                ) : (
                  <div style={styles.editRow}>
                    <input
                      type="number"
                      value={priceInput}
                      onChange={(e) => setPriceInput(e.target.value)}
                      style={styles.priceInput}
                    />
                    <button style={styles.saveBtn} onClick={handleUpdatePrice}>
                      <FiSave size={14} />
                    </button>
                  </div>
                )}
              </div>
              <p style={styles.currentPrice}>₹{selectedStock.price.toLocaleString("en-IN")}</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip formatter={(v) => [`₹${v}`, "Price"]} />
                  <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </>
          ) : (
            <p style={{ color: "#94a3b8" }}>No stock selected.</p>
          )}
        </div>
      </div>

      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Add New Stock</h3>
              <button style={styles.closeBtn} onClick={() => setShowAddModal(false)}>
                <FiX size={20} />
              </button>
            </div>
            <label style={styles.label}>Symbol</label>
            <input
              type="text"
              value={newStock.symbol}
              onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value })}
              style={styles.modalInput}
              placeholder="e.g. ORCL"
            />
            <label style={styles.label}>Company Name</label>
            <input
              type="text"
              value={newStock.name}
              onChange={(e) => setNewStock({ ...newStock, name: e.target.value })}
              style={styles.modalInput}
              placeholder="e.g. Oracle Corporation"
            />
            <label style={styles.label}>Initial Price (₹)</label>
            <input
              type="number"
              value={newStock.price}
              onChange={(e) => setNewStock({ ...newStock, price: e.target.value })}
              style={styles.modalInput}
              placeholder="e.g. 1200"
            />
            <button style={styles.confirmBtn} onClick={handleAddStock}>
              Add Stock
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: "24px", maxWidth: "1200px", margin: "0 auto" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "16px",
  },
  title: { fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px" },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "13.5px",
    cursor: "pointer",
  },
  successMsg: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  layout: { display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px" },
  listCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    maxHeight: "460px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
  },
  listItemActive: { background: "#f1f5f9" },
  listSymbol: { fontSize: "13.5px", fontWeight: 700, color: "#0f172a" },
  chartCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  chartHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" },
  chartSymbol: { fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: 0 },
  chartName: { fontSize: "13px", color: "#64748b", margin: "2px 0 0" },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  editRow: { display: "flex", gap: "8px" },
  priceInput: {
    width: "120px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
  },
  saveBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  currentPrice: { fontSize: "26px", fontWeight: 800, color: "#0f172a", margin: "14px 0" },
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
  modal: { background: "#fff", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "380px" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  modalTitle: { fontSize: "18px", fontWeight: 700, margin: 0, color: "#0f172a" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#64748b" },
  label: { fontSize: "12.5px", fontWeight: 600, color: "#334155", display: "block", marginBottom: "6px", marginTop: "12px" },
  modalInput: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  confirmBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#22c55e",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default AdminStockChart;
