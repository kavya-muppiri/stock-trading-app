import React from "react";
import "./AllOrders.css";

function AllOrders() {
  const orders = [
    {
      id: "ORD-1001",
      stock: "Apple Inc.",
      symbol: "AAPL",
      type: "Buy",
      quantity: 12,
      price: "$214.35",
      date: "Jul 12, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1002",
      stock: "Tesla Inc.",
      symbol: "TSLA",
      type: "Sell",
      quantity: 8,
      price: "$328.40",
      date: "Jul 11, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1003",
      stock: "NVIDIA Corp.",
      symbol: "NVDA",
      type: "Buy",
      quantity: 15,
      price: "$164.80",
      date: "Jul 10, 2026",
      status: "Pending",
    },
    {
      id: "ORD-1004",
      stock: "Microsoft Corp.",
      symbol: "MSFT",
      type: "Buy",
      quantity: 10,
      price: "$498.20",
      date: "Jul 9, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1005",
      stock: "Amazon.com Inc.",
      symbol: "AMZN",
      type: "Sell",
      quantity: 6,
      price: "$224.60",
      date: "Jul 8, 2026",
      status: "Cancelled",
    },
    {
      id: "ORD-1006",
      stock: "Alphabet Inc.",
      symbol: "GOOGL",
      type: "Buy",
      quantity: 18,
      price: "$186.15",
      date: "Jul 7, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1007",
      stock: "Meta Platforms",
      symbol: "META",
      type: "Sell",
      quantity: 7,
      price: "$715.30",
      date: "Jul 6, 2026",
      status: "Pending",
    },
    {
      id: "ORD-1008",
      stock: "Netflix Inc.",
      symbol: "NFLX",
      type: "Buy",
      quantity: 5,
      price: "$1,192.50",
      date: "Jul 5, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1009",
      stock: "Advanced Micro Devices",
      symbol: "AMD",
      type: "Sell",
      quantity: 20,
      price: "$182.75",
      date: "Jul 4, 2026",
      status: "Cancelled",
    },
    {
      id: "ORD-1010",
      stock: "Palantir Technologies",
      symbol: "PLTR",
      type: "Buy",
      quantity: 30,
      price: "$148.90",
      date: "Jul 3, 2026",
      status: "Completed",
    },
  ];

  return (
    <main className="all-orders-page">
      <section className="all-orders-container">
        <header className="all-orders-header">
          <span className="all-orders-eyebrow">Administration</span>
          <h1>All Orders</h1>
          <p>Monitor and manage trading orders placed across the platform.</p>
        </header>

        <section className="all-orders-controls">
          <label className="orders-search-field">
            <span className="orders-search-label">Search orders</span>
            <input
              type="search"
              placeholder="Search orders..."
              aria-label="Search orders"
            />
          </label>

          <label className="orders-filter-field">
            <span className="orders-filter-label">Order type</span>
            <select aria-label="Filter orders by type" defaultValue="All">
              <option value="All">All</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </label>
        </section>

        <section className="orders-table-section">
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Stock</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="Order ID">
                      <span className="order-id">{order.id}</span>
                    </td>
                    <td data-label="Stock">
                      <div className="order-stock-details">
                        <strong>{order.stock}</strong>
                        <span>{order.symbol}</span>
                      </div>
                    </td>
                    <td data-label="Type">
                      <span
                        className={`order-type ${
                          order.type === "Buy"
                            ? "order-type-buy"
                            : "order-type-sell"
                        }`}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td data-label="Quantity">{order.quantity}</td>
                    <td data-label="Price">{order.price}</td>
                    <td data-label="Order Date">{order.date}</td>
                    <td data-label="Status">
                      <span
                        className={`order-status ${
                          order.status === "Completed"
                            ? "order-status-completed"
                            : order.status === "Pending"
                              ? "order-status-pending"
                              : "order-status-cancelled"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav className="orders-pagination" aria-label="Orders pages">
            <button type="button" className="orders-pagination-button">
              Previous
            </button>
            <button
              type="button"
              className="orders-pagination-button orders-pagination-active"
            >
              1
            </button>
            <button type="button" className="orders-pagination-button">
              2
            </button>
            <button type="button" className="orders-pagination-button">
              Next
            </button>
          </nav>
        </section>
      </section>
    </main>
  );
}

export default AllOrders;