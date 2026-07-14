import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-page">

      <header className="dashboard-header">
        <h1>SB Stocks</h1>

        <nav className="dashboard-nav">
          <button onClick={() => navigate("/Profile")}>Profile</button>
          <button onClick={() => navigate("/History")}>History</button>
          <button onClick={() => navigate("/Users")}>Users</button>
          <button onClick={() => navigate("/AllOrders")}>Orders</button>
          <button onClick={() => navigate("/AllTransactions")}>Transactions</button>
          <button onClick={() => navigate("/Admin")}>Admin</button>
          <button onClick={() => navigate("/AdminStockChart")}>Analytics</button>
          <button onClick={() => navigate("/")}>Logout</button>
        </nav>
      </header>

      <h2>Dashboard</h2>

      <p className="dashboard-subtitle">
        Welcome to your Stock Trading Dashboard
      </p>

      <div className="cards">

        <div className="card">
          <h3>Portfolio Value</h3>
          <h2>$24,680</h2>
        </div>

        <div className="card">
          <h3>Available Balance</h3>
          <h2>$8,420</h2>
        </div>

        <div className="card">
          <h3>Total Stocks</h3>
          <h2>18</h2>
        </div>

        <div className="card">
          <h3>Profit</h3>
          <h2>+12.48%</h2>
        </div>

      </div>

    </main>
  );
}

export default Dashboard;