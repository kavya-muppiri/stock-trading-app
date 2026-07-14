import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Stock from "../models/Stock.js";

dotenv.config();

connectDB();

const stocks = [
  {
    symbol: "TCS",
    companyName: "Tata Consultancy Services",
    currentPrice: 3650,
    change: 1.2,
  },
  {
    symbol: "INFY",
    companyName: "Infosys",
    currentPrice: 1580,
    change: -0.8,
  },
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries",
    currentPrice: 2950,
    change: 0.5,
  },
  {
    symbol: "HDFCBANK",
    companyName: "HDFC Bank",
    currentPrice: 1750,
    change: 0.9,
  },
  {
    symbol: "ICICIBANK",
    companyName: "ICICI Bank",
    currentPrice: 1425,
    change: -0.4,
  },
];

const importData = async () => {
  try {
    await Stock.deleteMany();
    await Stock.insertMany(stocks);

    console.log("Stocks seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();