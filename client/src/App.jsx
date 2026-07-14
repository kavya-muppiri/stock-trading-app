import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import History from "./pages/History";
import Profile from "./pages/Profile";
import StockChart from "./pages/StockChart";
import Admin from "./pages/Admin";
import AdminStockChart from "./pages/AdminStockChart";
import Users from "./pages/Users";
import AllOrders from "./pages/AllOrders";
import AllTransactions from "./pages/AllTransactions";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/stock/:symbol" element={<StockChart />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/chart" element={<AdminStockChart />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/orders" element={<AllOrders />} />
        <Route path="/admin/transactions" element={<AllTransactions />} />
      </Routes>
    </>
  );
}

export default App;
