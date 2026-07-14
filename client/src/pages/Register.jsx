import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <main className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <form className="register-form" onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
          />

          <button type="submit">
            Create Account
          </button>

        </form>

      </div>

    </main>
  );
}

export default Register;