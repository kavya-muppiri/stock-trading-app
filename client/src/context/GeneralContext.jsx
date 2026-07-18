import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const GeneralContext = createContext(null);

export const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("sbstocks_token");
    const storedUser = localStorage.getItem("sbstocks_user");
    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        axiosInstance.get("/auth/me").then(({ data }) => {
          setUser(data.user);
          localStorage.setItem("sbstocks_user", JSON.stringify(data.user));
        }).catch(() => {
          localStorage.removeItem("sbstocks_token");
          localStorage.removeItem("sbstocks_user");
          setUser(null);
        });
      } catch {
        setUser(null);
      }
    }
    setLoadingAuth(false);
  }, []);

  const refreshAccountData = useCallback(async () => {
    const [stockRes, portfolioRes, transactionRes] = await Promise.all([
      axiosInstance.get("/stocks"), axiosInstance.get("/portfolio"), axiosInstance.get("/transactions"),
    ]);
    const normalizedStocks = stockRes.data.map((stock) => ({ ...stock, id: stock._id, name: stock.companyName, price: stock.currentPrice }));
    setStocks(normalizedStocks);
    setPortfolio(portfolioRes.data.map((holding) => ({
      id: holding._id, stockId: holding.stockId._id, symbol: holding.stockId.symbol, name: holding.stockId.companyName,
      qty: holding.quantity, avgPrice: holding.averagePrice, currentPrice: holding.stockId.currentPrice,
    })));
    setTransactions(transactionRes.data.map((trade) => ({
      id: trade._id, symbol: trade.stockId.symbol, type: trade.type, qty: trade.quantity, price: trade.price, date: trade.createdAt,
    })));
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
      return { success: false, message: err.response?.data?.message || "Login failed" };
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
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("sbstocks_token");
    localStorage.removeItem("sbstocks_user");
    setUser(null);
  }, []);

  const placeTrade = useCallback(async (type, stockId, quantity) => {
    const { data } = await axiosInstance.post(`/trade/${type.toLowerCase()}`, { stockId, quantity });
    const nextUser = { ...user, balance: data.balance };
    setUser(nextUser);
    localStorage.setItem("sbstocks_user", JSON.stringify(nextUser));
    await refreshAccountData();
    return data;
  }, [refreshAccountData, user]);

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
    refreshAccountData,
    placeTrade,
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
