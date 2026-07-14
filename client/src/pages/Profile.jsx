import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const statistics = [
    { label: "Portfolio Value", value: "$24,680.50", change: "+12.48%" },
    { label: "Available Balance", value: "$8,425.00", change: "Ready to trade" },
    { label: "Stocks Owned", value: "18", change: "Across 7 sectors" },
    { label: "Total Transactions", value: "64", change: "All time activity" },
  ];

  return (
    <main className="profile-page">
      <div style={{ marginBottom: "20px" }}>
  <Link
    to="/dashboard"
    style={{
      color: "#91aaff",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
    }}
  >
    ← Back to Dashboard
  </Link>
</div>
      <section className="profile-container">
        <header className="profile-header">
          <div>
            <span className="profile-eyebrow">Account Overview</span>
            <h1>My Profile</h1>
            <p>Manage your trading profile and virtual portfolio settings.</p>
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-card-content">
            <div className="profile-avatar" aria-label="Avatar for Demo User">
              DU
            </div>

            <div className="profile-details">
              <h2>Demo User</h2>
              <p className="profile-email">demo.user@example.com</p>
              <p className="member-since">Member since January 2026</p>
            </div>
          </div>

          <div className="profile-actions">
            <button type="button" className="profile-button profile-button-primary">
              Edit Profile
            </button>
            <button type="button" className="profile-button profile-button-secondary">
              Reset Virtual Balance
            </button>
          </div>
        </section>

        <section className="statistics-section">
          <div className="section-title">
            <span>Portfolio Summary</span>
            <h2>Your Trading Snapshot</h2>
          </div>

          <div className="statistics-grid">
            {statistics.map((statistic) => (
              <article className="statistic-card" key={statistic.label}>
                <p className="statistic-label">{statistic.label}</p>
                <h3 className="statistic-value">{statistic.value}</h3>
                <span className="statistic-meta">{statistic.change}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="theme-section">
          <div className="theme-content">
            <div>
              <span className="theme-label">Appearance</span>
              <h2>Theme Toggle</h2>
              <p>Personalize your dashboard experience with your preferred theme.</p>
            </div>
            <span className="coming-soon">Coming Soon</span>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Profile;