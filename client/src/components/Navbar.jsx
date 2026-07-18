import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiTrendingUp,
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
  FiPieChart,
} from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";

const Navbar = () => {
  const { user, logout } = useGeneralContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <style>{`
        .sb-navlink { display:flex; align-items:center; gap:6px; color:#e5e7eb; text-decoration:none; font-size:14px; font-weight:500; padding:8px 12px; border-radius:8px; transition: background 0.2s, color 0.2s; }
        .sb-navlink:hover { background: rgba(255,255,255,0.08); color:#fff; }
        @media (max-width: 768px) {
          .sb-desktop-links { display: none !important; }
          .sb-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .sb-mobile-menu { display: none !important; }
        }
      `}</style>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          <FiTrendingUp size={22} color="#22c55e" />
          <span>SB Stocks</span>
        </Link>
      </div>

      <div className="sb-desktop-links" style={styles.links}>
        {user ? (
          <>
            <Link to="/home" className="sb-navlink"><FiHome size={16} /> Home</Link>
            <Link to="/portfolio" className="sb-navlink"><FiPieChart size={16} /> Portfolio</Link>
            <span style={styles.balance}>
              ₹{Number(user.balance || 0).toLocaleString("en-IN")}
            </span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              <FiLogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="sb-navlink">Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>

      <button
        className="sb-mobile-toggle"
        style={styles.mobileToggle}
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? <FiX size={22} color="#fff" /> : <FiMenu size={22} color="#fff" />}
      </button>

      {menuOpen && (
        <div className="sb-mobile-menu" style={styles.mobileMenu}>
          {user ? (
            <>
              <Link to="/home" className="sb-navlink" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/portfolio" className="sb-navlink" onClick={() => setMenuOpen(false)}>Portfolio</Link>
              <button style={styles.logoutBtn} onClick={handleLogout}>
                <FiLogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="sb-navlink" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="sb-navlink" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "#0f172a",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },
  left: { display: "flex", alignItems: "center" },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#fff",
    fontSize: "20px",
    fontWeight: 700,
    textDecoration: "none",
  },
  links: { display: "flex", alignItems: "center", gap: "6px" },
  balance: {
    color: "#22c55e",
    fontWeight: 600,
    fontSize: "14px",
    padding: "6px 12px",
    background: "rgba(34,197,94,0.1)",
    borderRadius: "8px",
  },
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  registerBtn: {
    background: "#22c55e",
    color: "#0f172a",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
  },
  mobileToggle: {
    display: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#0f172a",
    display: "flex",
    flexDirection: "column",
    padding: "12px",
    gap: "4px",
    zIndex: 50,
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
};

export default Navbar;
