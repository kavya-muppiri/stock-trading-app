import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import transactionRoutes from "./routes/transactRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
dotenv.config();

connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("SB Stocks API is running...");
});

app.post("/test", (req, res) => {
  res.json({
    message: "POST route works!",
  });
});

// Authentication Routes

app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/trade", tradeRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
