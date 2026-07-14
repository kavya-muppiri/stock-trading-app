import React from "react";
import "./AllTransactions.css";

function AllTransactions() {
  const transactions = [
    {
      id: "TXN-78241",
      user: "Alex Morgan",
      email: "alex.morgan@example.com",
      stock: "Apple Inc.",
      symbol: "AAPL",
      type: "Buy",
      amount: "$2,572.20",
      date: "Jul 14, 2026",
      status: "Completed",
    },
    {
      id: "TXN-78240",
      user: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      stock: "Tesla Inc.",
      symbol: "TSLA",
      type: "Sell",
      amount: "$2,627.20",
      date: "Jul 14, 2026",
      status: "Completed",
    },
    {
      id: "TXN-78239",
      user: "Daniel Kim",
      email: "daniel.kim@example.com",
      stock: "NVIDIA Corp.",
      symbol: "NVDA",
      type: "Buy",
      amount: "$4,120.00",
      date: "Jul 13, 2026",
      status: "Pending",
    },
    {
      id: "TXN-78238",
      user: "Riya Patel",
      email: "riya.patel@example.com",
      stock: "Microsoft Corp.",
      symbol: "MSFT",
      type: "Buy",
      amount: "$4,982.00",
      date: "Jul 12, 2026",
      status: "Completed",
    },
    {
      id: "TXN-78237",
      user: "Marcus Williams",
      email: "marcus.williams@example.com",
      stock: "Amazon.com Inc.",
      symbol: "AMZN",
      type: "Sell",
      amount: "$1,347.60",
      date: "Jul 11, 2026",
      status: "Failed",
    },
    {
      id: "TXN-78236",
      user: "Emily Carter",
      email: "emily.carter@example.com",
      stock: "Alphabet Inc.",
      symbol: "GOOGL",
      type: "Buy",
      amount: "$3,350.70",
      date: "Jul 10, 2026",
      status: "Completed",
    },
    {
      id: "TXN-78235",
      user: "James Okafor",
      email: "james.okafor@example.com",
      stock: "Meta Platforms",
      symbol: "META",
      type: "Sell",
      amount: "$5,007.10",
      date: "Jul 9, 2026",
      status: "Pending",
    },
    {
      id: "TXN-78234",
      user: "Lina Nguyen",
      email: "lina.nguyen@example.com",
      stock: "Netflix Inc.",
      symbol: "NFLX",
      type: "Buy",
      amount: "$5,962.50",
      date: "Jul 8, 2026",
      status: "Completed",
    },
    {
      id: "TXN-78233",
      user: "Noah Thompson",
      email: "noah.thompson@example.com",
      stock: "Advanced Micro Devices",
      symbol: "AMD",
      type: "Sell",
      amount: "$3,655.00",
      date: "Jul 7, 2026",
      status: "Failed",
    },
    {
      id: "TXN-78232",
      user: "Olivia Brown",
      email: "olivia.brown@example.com",
      stock: "Palantir Technologies",
      symbol: "PLTR",
      type: "Buy",
      amount: "$4,467.00",
      date: "Jul 6, 2026",
      status: "Completed",
    },
  ];

  return (
    <main className="all-transactions-page">
      <section className="all-transactions-container">
        <header className="all-transactions-header">
          <span className="all-transactions-eyebrow">Administration</span>
          <h1>All Transactions</h1>
          <p>Monitor every transaction performed across the trading platform.</p>
        </header>

        <section className="transactions-controls">
          <label className="transactions-search-field">
            <span className="transactions-search-label">Search transactions</span>
            <input
              type="search"
              placeholder="Search transactions..."
              aria-label="Search transactions"
            />
          </label>

          <label className="transactions-date-filter-field">
            <span className="transactions-date-filter-label">Date range</span>
            <select aria-label="Filter transactions by date" defaultValue="All Dates">
              <option value="All Dates">All Dates</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
            </select>
          </label>

          <button type="button" className="export-csv-button">
            Export CSV
          </button>
        </section>

        <section className="transactions-table-section">
          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>User</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td data-label="Transaction ID">
                      <span className="transaction-id">{transaction.id}</span>
                    </td>
                    <td data-label="User">
                      <div className="transaction-user-details">
                        <strong>{transaction.user}</strong>
                        <span>{transaction.email}</span>
                      </div>
                    </td>
                    <td data-label="Stock">
                      <div className="transaction-stock-details">
                        <strong>{transaction.stock}</strong>
                        <span>{transaction.symbol}</span>
                      </div>
                    </td>
                    <td data-label="Type">
                      <span
                        className={`admin-transaction-type ${
                          transaction.type === "Buy"
                            ? "admin-transaction-type-buy"
                            : "admin-transaction-type-sell"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td data-label="Amount" className="transaction-amount">
                      {transaction.amount}
                    </td>
                    <td data-label="Date">{transaction.date}</td>
                    <td data-label="Status">
                      <span
                        className={`admin-transaction-status ${
                          transaction.status === "Completed"
                            ? "admin-transaction-status-completed"
                            : transaction.status === "Pending"
                              ? "admin-transaction-status-pending"
                              : "admin-transaction-status-failed"
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

          <nav className="transactions-pagination" aria-label="Transactions pages">
            <button type="button" className="transactions-pagination-button">
              Previous
            </button>
            <button
              type="button"
              className="transactions-pagination-button transactions-pagination-active"
            >
              1
            </button>
            <button type="button" className="transactions-pagination-button">
              2
            </button>
            <button type="button" className="transactions-pagination-button">
              Next
            </button>
          </nav>
        </section>
      </section>
    </main>
  );
}

export default AllTransactions;