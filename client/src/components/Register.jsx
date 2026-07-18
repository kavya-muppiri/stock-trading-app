import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiTrendingUp, FiEye, FiEyeOff } from "react-icons/fi";
import { useGeneralContext } from "../context/GeneralContext";

const Register = () => {
  const { register } = useGeneralContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const res = await register(form.name, form.email, form.password);
    setLoading(false);
    if (res.success) {
      navigate("/home");
    } else {
      setError(res.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <FiTrendingUp size={28} color="#22c55e" />
          <h1 style={styles.title}>SB Stocks</h1>
        </div>
        <p style={styles.subtitle}>Create your paper trading account</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FiUser size={18} color="#94a3b8" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <FiMail size={18} color="#94a3b8" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <FiLock size={18} color="#94a3b8" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
            <button
              type="button"
              style={styles.eyeBtn}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <FiEyeOff size={18} color="#94a3b8" /> : <FiEye size={18} color="#94a3b8" />}
            </button>
          </div>
          <div style={styles.inputGroup}>
            <FiLock size={18} color="#94a3b8" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "calc(100vh - 64px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f5f9",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  logoRow: { display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" },
  title: { fontSize: "24px", fontWeight: 700, color: "#0f172a", margin: 0 },
  subtitle: { textAlign: "center", color: "#64748b", fontSize: "14px", marginTop: "6px", marginBottom: "24px" },
  errorBox: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 14px",
    position: "relative",
  },
  input: {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "14px",
    color: "#0f172a",
    background: "transparent",
  },
  eyeBtn: { background: "none", border: "none", cursor: "pointer", display: "flex" },
  submitBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px",
  },
  footerText: { textAlign: "center", fontSize: "13px", color: "#64748b", marginTop: "20px" },
  link: { color: "#22c55e", fontWeight: 600, textDecoration: "none" },
};

export default Register;
