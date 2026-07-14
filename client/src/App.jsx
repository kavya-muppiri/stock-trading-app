
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Users from "./pages/Users";
import AllOrders from "./pages/AllOrders";
import AllTransactions from "./pages/AllTransactions";
import Admin from "./pages/Admin";
import AdminStockChart from "./pages/AdminStockChart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/History" element={<History />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/AllOrders" element={<AllOrders />} />
      <Route path="/AllTransactions" element={<AllTransactions />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/AdminStockChart" element={<AdminStockChart />} />
    </Routes>
  );
}

export default App;