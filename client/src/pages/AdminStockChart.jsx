import React from "react";
import { Link } from "react-router-dom";
import "./AdminStockChart.css";

function AdminStockChart() {
  const statistics = [
    {
      title: "Top Gainer",
      value: "NVDA +8.42%",
      description: "NVIDIA led today's market gains",
      tone: "positive",
    },
    {
      title: "Top Loser",
      value: "TSLA -3.18%",
      description: "Tesla recorded the largest decline",
      tone: "negative",
    },
    {
      title: "Most Traded",
      value: "AAPL",
      description: "2.8M shares traded today",
      tone: "neutral",
    },
    {
      title: "Market Volume",
      value: "$18.6B",
      description: "Total volume across tracked stocks",
      tone: "neutral",
    },
  ];

  const chartBars = [
    "chart-bar-one",
    "chart-bar-two",
    "chart-bar-three",
    "chart-bar-four",
    "chart-bar-five",
    "chart-bar-six",
    "chart-bar-seven",
    "chart-bar-eight",
    "chart-bar-nine",
    "chart-bar-ten",
    "chart-bar-eleven",
    "chart-bar-twelve",
  ];

  return (
    <main className="admin-stock-chart-page">
      <div style={{ marginBottom: "20px" }}>
  <Link
    to="/Dashboard"
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
      <section className="admin-stock-chart-container">
        <header className="admin-stock-chart-header">
          <span className="admin-stock-chart-eyebrow">Market Intelligence</span>
          <h1>Stock Analytics</h1>
          <p>Monitor stock performance and market trends.</p>
        </header>

        <section className="stock-analytics-statistics-grid">
          {statistics.map((statistic) => (
            <article
              className={`stock-analytics-stat-card stock-analytics-stat-${statistic.tone}`}
              key={statistic.title}
            >
              <p className="stock-analytics-stat-title">{statistic.title}</p>
              <h2 className="stock-analytics-stat-value">{statistic.value}</h2>
              <span className="stock-analytics-stat-description">
                {statistic.description}
              </span>
            </article>
          ))}
        </section>

        <section className="stock-analytics-controls">
          <label className="stock-selector-field">
            <span className="stock-selector-label">Select stock</span>
            <select aria-label="Select a stock" defaultValue="AAPL">
              <option value="AAPL">AAPL</option>
              <option value="TSLA">TSLA</option>
              <option value="NVDA">NVDA</option>
              <option value="MSFT">MSFT</option>
              <option value="AMZN">AMZN</option>
            </select>
          </label>

          <div className="time-filter" aria-label="Chart time range">
            <span className="time-filter-label">Time range</span>
            <div className="time-filter-options">
              <button type="button" className="time-filter-button">
                7 Days
              </button>
              <button type="button" className="time-filter-button time-filter-active">
                30 Days
              </button>
              <button type="button" className="time-filter-button">
                6 Months
              </button>
              <button type="button" className="time-filter-button">
                1 Year
              </button>
            </div>
          </div>
        </section>

        <section className="stock-performance-card">
          <div className="stock-performance-heading">
            <div>
              <span className="stock-performance-label">AAPL Overview</span>
              <h2>Stock Performance Chart</h2>
              <p>Interactive chart will be integrated later.</p>
            </div>

            <div className="chart-legend" aria-label="Chart legend">
              <span className="chart-legend-item chart-legend-profit">
                <i aria-hidden="true" />
                Profit
              </span>
              <span className="chart-legend-item chart-legend-loss">
                <i aria-hidden="true" />
                Loss
              </span>
              <span className="chart-legend-item chart-legend-volume">
                <i aria-hidden="true" />
                Volume
              </span>
            </div>
          </div>

          <div className="stock-chart-placeholder" aria-label="Stock chart placeholder">
            <div className="chart-grid-lines" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="stock-chart-bars" aria-hidden="true">
              {chartBars.map((bar) => (
                <span className={`stock-chart-bar ${bar}`} key={bar} />
              ))}
            </div>

            <div className="stock-chart-labels" aria-hidden="true">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default AdminStockChart;