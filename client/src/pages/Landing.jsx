import React from "react";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiShield, FiBarChart2, FiZap } from "react-icons/fi";

const features = [
  {
    icon: <FiTrendingUp size={26} color="#22c55e" />,
    title: "Real-Time Style Trading",
    desc: "Practice buying and selling stocks with live-style price simulations, risk free.",
  },
  {
    icon: <FiShield size={26} color="#22c55e" />,
    title: "Zero Risk, Real Learning",
    desc: "Trade with virtual currency and learn the market without losing real money.",
  },
  {
    icon: <FiBarChart2 size={26} color="#22c55e" />,
    title: "Portfolio Analytics",
    desc: "Track your holdings, profit & loss, and transaction history in one dashboard.",
  },
  {
    icon: <FiZap size={26} color="#22c55e" />,
    title: "Instant Execution",
    desc: "Orders are placed and reflected instantly in your paper trading portfolio.",
  },
];

const Landing = () => {
  return (
    <div style={styles.page}>
      <style>{`
        @media (max-width: 768px) {
          .sb-landing-grid { grid-template-columns: 1fr !important; }
          .sb-hero-title { font-size: 32px !important; }
        }
      `}</style>

      <section style={styles.hero}>
        <h1 className="sb-hero-title" style={styles.heroTitle}>
          Master the Market with <span style={{ color: "#22c55e" }}>SB Stocks</span>
        </h1>
        <p style={styles.heroSubtitle}>
          A risk-free paper trading platform to learn stock market investing with
          virtual money and real market dynamics.
        </p>
        <div style={styles.heroButtons}>
          <Link to="/register" style={styles.primaryBtn}>Get Started</Link>
          <Link to="/login" style={styles.secondaryBtn}>Login</Link>
        </div>
      </section>

      <section className="sb-landing-grid" style={styles.grid}>
        {features.map((f, idx) => (
          <div key={idx} style={styles.card}>
            <div style={styles.iconWrap}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      <footer style={styles.footer}>
        <p>© 2026 SB Stocks. Built for learning purposes only.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: { background: "#f8fafc", minHeight: "calc(100vh - 64px)" },
  hero: {
    textAlign: "center",
    padding: "80px 24px 60px",
    background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
    color: "#fff",
  },
  heroTitle: { fontSize: "42px", fontWeight: 800, margin: "0 auto 16px", maxWidth: "700px" },
  heroSubtitle: { fontSize: "16px", color: "#cbd5e1", maxWidth: "560px", margin: "0 auto 32px" },
  heroButtons: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  primaryBtn: {
    background: "#22c55e",
    color: "#0f172a",
    padding: "12px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "15px",
  },
  secondaryBtn: {
    background: "transparent",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "15px",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "48px 24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "24px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
  },
  iconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "rgba(34,197,94,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  },
  cardTitle: { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" },
  cardDesc: { fontSize: "13.5px", color: "#64748b", lineHeight: 1.5, margin: 0 },
  footer: {
    textAlign: "center",
    padding: "24px",
    color: "#94a3b8",
    fontSize: "13px",
    borderTop: "1px solid #e2e8f0",
  },
};

export default Landing;
