import React from "react";
import "./Admin.css";
function Admin() {
  const statistics = [
    {
      title: "Total Users",
      value: "12,480",
      description: "Registered platform members",
    },
    {
      title: "Active Traders",
      value: "8,942",
      description: "Users active this month",
    },
    {
      title: "Total Orders",
      value: "46,218",
      description: "Orders placed across the platform",
    },
    {
      title: "Total Transactions",
      value: "38,765",
      description: "Completed and pending transactions",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Daniel Kim",
      email: "daniel.kim@example.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Riya Patel",
      email: "riya.patel@example.com",
      status: "Active",
    },
    {
      id: 5,
      name: "Emily Carter",
      email: "emily.carter@example.com",
      status: "Active",
    },
  ];

  return (
    <main className="admin-page">
      <section className="admin-container">
        <header className="admin-header">
          <span className="admin-eyebrow">Administration</span>
          <h1>Admin Dashboard</h1>
          <p>Monitor platform activity, manage users, and review trading operations.</p>
        </header>

        <section className="admin-statistics-grid">
          {statistics.map((statistic) => (
            <article className="admin-statistic-card" key={statistic.title}>
              <p className="admin-statistic-title">{statistic.title}</p>
              <h2 className="admin-statistic-value">{statistic.value}</h2>
              <span className="admin-statistic-description">
                {statistic.description}
              </span>
            </article>
          ))}
        </section>

        <section className="admin-content-grid">
          <article className="admin-recent-users-card">
            <div className="admin-section-heading">
              <span>Platform Members</span>
              <h2>Recent Users</h2>
            </div>

            <div className="admin-users-table-wrapper">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td data-label="Name">
                        <strong className="admin-user-name">{user.name}</strong>
                      </td>
                      <td data-label="Email">
                        <span className="admin-user-email">{user.email}</span>
                      </td>
                      <td data-label="Status">
                        <span
                          className={`admin-user-status ${
                            user.status === "Active"
                              ? "admin-user-status-active"
                              : "admin-user-status-inactive"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="admin-chart-card">
            <span className="admin-chart-label">Market Overview</span>
            <h2>Stock Performance Chart</h2>
            <p>Chart will be integrated later.</p>
            <div className="admin-chart-placeholder" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </article>
        </section>

        <section className="admin-quick-actions">
          <div className="admin-section-heading">
            <span>Shortcuts</span>
            <h2>Quick Actions</h2>
          </div>

          <div className="admin-actions-grid">
            <button type="button" className="admin-action-button">
              Manage Users
            </button>
            <button type="button" className="admin-action-button">
              Manage Orders
            </button>
            <button type="button" className="admin-action-button">
              View Transactions
            </button>
            <button type="button" className="admin-action-button">
              View Reports
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Admin;