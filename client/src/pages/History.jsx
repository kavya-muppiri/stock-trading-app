
import React from "react";
import { Link } from "react-router-dom";
import "./History.css";

function History() {
  const transactions = [
    {
      id: 1,
      date: "Jul 12, 2026",
      stock: "Apple Inc.",
      symbol: "AAPL",
      type: "Buy",
      quantity: 12,
      price: "$214.35",
      total: "$2,572.20",
      status: "Completed",
    },
    {
      id: 2,
      date: "Jul 11, 2026",
      stock: "Tesla Inc.",
      symbol: "TSLA",
      type: "Sell",
      quantity: 8,
      price: "$328.40",
      total: "$2,627.20",
      status: "Completed",
    },
    {
      id: 3,
      date: "Jul 10, 2026",
      stock: "NVIDIA Corp.",
      symbol: "NVDA",
      type: "Buy",
      quantity: 15,
      price: "$164.80",
      total: "$2,472.00",
      status: "Completed",
    },
    {
      id: 4,
      date: "Jul 9, 2026",
      stock: "Microsoft Corp.",
      symbol: "MSFT",
      type: "Buy",
      quantity: 10,
      price: "$498.20",
      total: "$4,982.00",
      status: "Pending",
    },
    {
      id: 5,
      date: "Jul 8, 2026",
      stock: "Amazon.com Inc.",
      symbol: "AMZN",
      type: "Sell",
      quantity: 6,
      price: "$224.60",
      total: "$1,347.60",
      status: "Completed",
    },
    {
      id: 6,
      date: "Jul 7, 2026",
      stock: "Alphabet Inc.",
      symbol: "GOOGL",
      type: "Buy",
      quantity: 18,
      price: "$186.15",
      total: "$3,350.70",
      status: "Completed",
    },
    {
      id: 7,
      date: "Jul 6, 2026",
      stock: "Meta Platforms",
      symbol: "META",
      type: "Sell",
      quantity: 7,
      price: "$715.30",
      total: "$5,007.10",
      status: "Pending",
    },
    {
      id: 8,
      date: "Jul 5, 2026",
      stock: "Netflix Inc.",
      symbol: "NFLX",
      type: "Buy",
      quantity: 5,
      price: "$1,192.50",
      total: "$5,962.50",
      status: "Completed",
    },
  ];

  return (
    <main className="history-page">
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
      <section className="history-container">
        <header className="history-header">
          <span className="history-eyebrow">Portfolio Activity</span>
          <h1>Transaction History</h1>
          <p>Review every paper trade and monitor your recent portfolio activity.</p>
        </header>

        <section className="history-controls">
          <label className="search-field">
            <span className="search-label">Search transactions</span>
            <input
              type="search"
              placeholder="Search by stock name..."
              aria-label="Search by stock name"
            />
          </label>

          <label className="filter-field">
            <span className="filter-label">Transaction type</span>
            <select aria-label="Filter transactions by type" defaultValue="All">
              <option value="All">All</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </label>
        </section>

        <section className="transaction-section">
          <div className="transaction-table-wrapper">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td data-label="Date">{transaction.date}</td>
                    <td data-label="Stock">
                      <div className="stock-details">
                        <strong>{transaction.stock}</strong>
                        <span>{transaction.symbol}</span>
                      </div>
                    </td>
                    <td data-label="Type">
                      <span
                        className={`transaction-type ${
                          transaction.type === "Buy"
                            ? "transaction-type-buy"
                            : "transaction-type-sell"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td data-label="Quantity">{transaction.quantity}</td>
                    <td data-label="Price">{transaction.price}</td>
                    <td data-label="Total" className="transaction-total">
                      {transaction.total}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`transaction-status ${
                          transaction.status === "Completed"
                            ? "transaction-status-completed"
                            : "transaction-status-pending"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="pagination" aria-label="Transaction history pages">
            <button type="button" className="pagination-button">
              Previous
            </button>
            <button type="button" className="pagination-button pagination-active">
              1
            </button>
            <button type="button" className="pagination-button">
              2
            </button>
            <button type="button" className="pagination-button">
              Next
            </button>
          </nav>
        </section>
      </section>
    </main>
  );
}

export default History;
