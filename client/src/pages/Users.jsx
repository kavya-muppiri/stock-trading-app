import React, { useState, useMemo } from "react";
import { FiSearch, FiUser, FiShield, FiTrash2 } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";
import axiosInstance from "../api/axiosInstance";

const Users = () => {
  const { allUsers, setAllUsers } = useGeneralContext();
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(
    () =>
      allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      ),
    [allUsers, search]
  );

  const handleRemove = async (id) => {
    try {
      await axiosInstance.delete(`/admin/users/${id}`);
    } catch (err) {
      // backend unavailable, remove locally
    }
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>All Users</h2>
          <p style={styles.subtitle}>Manage registered users on SB Stocks.</p>
        </div>
        <div style={styles.searchBox}>
          <FiSearch size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Balance</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.userCell}>
                    <div style={styles.avatar}>{u.name.charAt(0).toUpperCase()}</div>
                    <span style={{ fontWeight: 600 }}>{u.name}</span>
                  </div>
                </td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: u.isAdmin ? "rgba(168,85,247,0.1)" : "rgba(59,130,246,0.1)",
                      color: u.isAdmin ? "#9333ea" : "#2563eb",
                    }}
                  >
                    {u.isAdmin ? <FiShield size={12} /> : <FiUser size={12} />}
                    {u.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td style={styles.td}>₹{Number(u.balance || 0).toLocaleString("en-IN")}</td>
                <td style={styles.td}>
                  <button style={styles.deleteBtn} onClick={() => handleRemove(u.id)}>
                    <FiTrash2 size={14} /> Remove
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} style={styles.emptyRow}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
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
  table: { width: "100%", borderCollapse: "collapse", minWidth: "620px" },
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
  userCell: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#0f172a",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 700,
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(239,68,68,0.1)",
    color: "#dc2626",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
  emptyRow: { textAlign: "center", padding: "24px", color: "#94a3b8" },
};

export default Users;
