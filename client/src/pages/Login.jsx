import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (email === "" || password === "") {
      alert("Please enter both Email and Password.");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Login to continue your paper trading journey.</p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;