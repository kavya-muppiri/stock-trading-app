import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const GeneralContext = createContext(null);

const MOCK_STOCKS = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3845.5, change: 1.24 },
  { symbol: "INFY", name: "Infosys Ltd", price: 1512.2, change: -0.85 },
  { symbol: "WIPRO", name: "Wipro Ltd", price: 452.1, change: 0.42 },
  { symbol: "HCLTECH", name: "HCL Technologies", price: 1678.9, change: 2.1 },
  { symbol: "TECHM", name: "Tech Mahindra", price: 1345.75, change: -1.1 },
  { symbol: "IBM", name: "IBM Corporation", price: 15420.0, change: 0.65 },
];

const MOCK_PORTFOLIO = [
  { symbol: "TCS", name: "Tata Consultancy Services", qty: 10, avgPrice: 3700.0, currentPrice: 3845.5 },
  { symbol: "INFY", name: "Infosys Ltd", qty: 25, avgPrice: 1550.0, currentPrice: 1512.2 },
  { symbol: "WIPRO", name: "Wipro Ltd", qty: 40, avgPrice: 430.0, currentPrice: 452.1 },
];

const MOCK_TRANSACTIONS = [
  { id: "t1", symbol: "TCS", type: "BUY", qty: 10, price: 3700.0, date: "2026-07-01T10:15:00Z" },
  { id: "t2", symbol: "INFY", type: "BUY", qty: 25, price: 1550.0, date: "2026-07-03T11:05:00Z" },
  { id: "t3", symbol: "WIPRO", type: "BUY", qty: 40, price: 430.0, date: "2026-07-05T09:40:00Z" },
  { id: "t4", symbol: "HCLTECH", type: "SELL", qty: 5, price: 1650.0, date: "2026-07-08T14:20:00Z" },
];

const MOCK_ORDERS = [
  { id: "o1", symbol: "TECHM", type: "BUY", qty: 15, price: 1340.0, status: "PENDING", date: "2026-07-11T09:00:00Z" },
  { id: "o2", symbol: "IBM", type: "SELL", qty: 2, price: 15500.0, status: "PENDING", date: "2026-07-12T13:30:00Z" },
];

const MOCK_USERS = [
  { id: "u1", name: "Kavya Sri", email: "kavya@sbstocks.com", balance: 125000, isAdmin: false },
  { id: "u2", name: "Rahul Varma", email: "rahul@sbstocks.com", balance: 87500, isAdmin: false },
  { id: "u3", name: "Admin User", email: "admin@sbstocks.com", balance: 0, isAdmin: true },
];

export const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [stocks, setStocks] = useState(MOCK_STOCKS);
  const [portfolio, setPortfolio] = useState(MOCK_PORTFOLIO);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [allUsers, setAllUsers] = useState(MOCK_USERS);

  useEffect(() => {
    const token = localStorage.getItem("sbstocks_token");
    const storedUser = localStorage.getItem("sbstocks_user");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { token, user: loggedInUser } = res.data;
      localStorage.setItem("sbstocks_token", token);
      localStorage.setItem("sbstocks_user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return { success: true };
    } catch (err) {
      const mockUser = {
        id: "u1",
        name: "Kavya Sri",
        email,
        balance: 125000,
        isAdmin: email.includes("admin"),
      };
      localStorage.setItem("sbstocks_token", "mock_token");
      localStorage.setItem("sbstocks_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true, mock: true };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const res = await axiosInstance.post("/auth/register", { name, email, password });
      const { token, user: newUser } = res.data;
      localStorage.setItem("sbstocks_token", token);
      localStorage.setItem("sbstocks_user", JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    } catch (err) {
      const mockUser = { id: "u_new", name, email, balance: 100000, isAdmin: false };
      localStorage.setItem("sbstocks_token", "mock_token");
      localStorage.setItem("sbstocks_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true, mock: true };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("sbstocks_token");
    localStorage.removeItem("sbstocks_user");
    setUser(null);
  }, []);

  const value = {
    user,
    setUser,
    loadingAuth,
    login,
    register,
    logout,
    stocks,
    setStocks,
    portfolio,
    setPortfolio,
    transactions,
    setTransactions,
    orders,
    setOrders,
    allUsers,
    setAllUsers,
  };

  return <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>;
};

export const useGeneralContext = () => {
  const ctx = useContext(GeneralContext);
  if (!ctx) {
    throw new Error("useGeneralContext must be used within a GeneralProvider");
  }
  return ctx;
};

export default GeneralContext;
