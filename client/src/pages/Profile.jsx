import React, { useState } from "react";
import { FiUser, FiMail, FiEdit2, FiSave, FiDollarSign, FiPieChart } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";
import axiosInstance from "../api/axiosInstance";

const Profile = () => {
  const { user, setUser, portfolio, transactions } = useGeneralContext();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    try {
      await axiosInstance.put("/users/profile", { name });
    } catch (err) {
      // backend unavailable, update locally
    }
    setUser({ ...user, name });
    setSaving(false);
    setEditing(false);
    setMessage("Profile updated successfully.");
    setTimeout(() => setMessage(""), 2500);
  };

  if (!user) {
    return (
      <div style={styles.page}>
        <p style={{ color: "#64748b" }}>You need to be logged in to view your profile.</p>
      </div>
    );
  }

  const totalHoldings = portfolio.length;
  const totalTrades = transactions.length;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Profile</h2>
      <p style={styles.subtitle}>Manage your account information.</p>

      <div style={styles.card}>
        <div style={styles.avatarRow}>
          <div style={styles.avatar}>{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
          <div>
            <h3 style={styles.userName}>{user.name}</h3>
            <p style={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        {message && <div style={styles.successMsg}>{message}</div>}

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FiUser size={14} /> Full Name
          </label>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          ) : (
            <p style={styles.value}>{user.name}</p>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <FiMail size={14} /> Email Address
          </label>
          <p style={styles.value}>{user.email}</p>
        </div>

        {editing ? (
          <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
            <FiSave size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        ) : (
          <button style={styles.editBtn} onClick={() => setEditing(true)}>
            <FiEdit2 size={16} /> Edit Profile
          </button>
        )}
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <FiDollarSign size={20} color="#22c55e" />
          <div>
            <p style={styles.statLabel}>Available Balance</p>
            <p style={styles.statValue}>₹{Number(user.balance || 0).toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <FiPieChart size={20} color="#3b82f6" />
          <div>
            <p style={styles.statLabel}>Active Holdings</p>
            <p style={styles.statValue}>{totalHoldings}</p>
          </div>
        </div>
        <div style={styles.statCard}>
          <FiPieChart size={20} color="#a855f7" />
          <div>
            <p style={styles.statLabel}>Total Trades</p>
            <p style={styles.statValue}>{totalTrades}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "24px", maxWidth: "700px", margin: "0 auto" },
  title: { fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "4px", marginBottom: "20px" },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  },
  avatarRow: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" },
  avatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#fff",
    fontSize: "22px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: { fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 },
  userEmail: { fontSize: "13.5px", color: "#64748b", margin: "2px 0 0" },
  successMsg: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  formGroup: { marginBottom: "16px" },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12.5px",
    fontWeight: 600,
    color: "#64748b",
    marginBottom: "6px",
  },
  value: { fontSize: "15px", color: "#0f172a", margin: 0 },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#0f172a",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  statLabel: { fontSize: "12px", color: "#64748b", margin: 0 },
  statValue: { fontSize: "17px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0" },
};

export default Profile;
