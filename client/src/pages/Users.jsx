import React from "react";
import { Link } from "react-router-dom";
import "./Users.css";

function Users() {
  const users = [
    {
      id: 1,
      initials: "AM",
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      role: "Trader",
      status: "Active",
    },
    {
      id: 2,
      initials: "SJ",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Trader",
      status: "Active",
    },
    {
      id: 3,
      initials: "DK",
      name: "Daniel Kim",
      email: "daniel.kim@example.com",
      role: "Analyst",
      status: "Inactive",
    },
    {
      id: 4,
      initials: "RP",
      name: "Riya Patel",
      email: "riya.patel@example.com",
      role: "Trader",
      status: "Active",
    },
    {
      id: 5,
      initials: "MW",
      name: "Marcus Williams",
      email: "marcus.williams@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 6,
      initials: "EC",
      name: "Emily Carter",
      email: "emily.carter@example.com",
      role: "Trader",
      status: "Inactive",
    },
    {
      id: 7,
      initials: "JO",
      name: "James Okafor",
      email: "james.okafor@example.com",
      role: "Analyst",
      status: "Active",
    },
    {
      id: 8,
      initials: "LN",
      name: "Lina Nguyen",
      email: "lina.nguyen@example.com",
      role: "Trader",
      status: "Active",
    },
  ];

  return (
    <main className="users-page">
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
      <section className="users-container">
        <header className="users-header">
          <span className="users-eyebrow">Administration</span>
          <h1>Users Management</h1>
          <p>Review and manage user access across the Stock Trading App.</p>
        </header>

        <section className="users-controls">
          <label className="users-search-field">
            <span className="users-search-label">Search users</span>
            <input
              type="search"
              placeholder="Search users..."
              aria-label="Search users"
            />
          </label>
        </section>

        <section className="users-table-section">
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-label="Avatar">
                      <span className="user-avatar" aria-label={`${user.name} avatar`}>
                        {user.initials}
                      </span>
                    </td>
                    <td data-label="Name">
                      <strong className="user-name">{user.name}</strong>
                    </td>
                    <td data-label="Email">
                      <span className="user-email">{user.email}</span>
                    </td>
                    <td data-label="Role">
                      <span className="user-role">{user.role}</span>
                    </td>
                    <td data-label="Status">
                      <span
                        className={`user-status ${
                          user.status === "Active"
                            ? "user-status-active"
                            : "user-status-inactive"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td data-label="Actions">
                      <div className="user-actions">
                        <button type="button" className="user-action-button user-view-button">
                          View
                        </button>
                        <button
                          type="button"
                          className="user-action-button user-delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Users;
