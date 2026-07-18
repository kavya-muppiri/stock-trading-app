
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useGeneralContext } from "./context/GeneralContext";

import Landing from "./pages/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import StockChart from "./pages/StockChart";

const ProtectedRoute = ({ children }) => {
  const { user, loadingAuth } = useGeneralContext();
  if (loadingAuth) return <p style={{ padding: "24px" }}>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
};

const AccountData = ({ children }) => {
  const { refreshAccountData, user } = useGeneralContext();
  useEffect(() => { if (user) refreshAccountData().catch(() => {}); }, [user, refreshAccountData]);
  return children;
};

function App() {
  const { user } = useGeneralContext();
  const location = useLocation();
  const showNavbar = user && !["/login", "/register"].includes(location.pathname);
  return (
    <AccountData>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
        <Route path="/stock/:symbol" element={<ProtectedRoute><StockChart /></ProtectedRoute>} />
        <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AccountData>
  );
}

export default App;
