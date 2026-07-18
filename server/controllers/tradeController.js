import mongoose from "mongoose";
import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

const isValidQuantity = (quantity) => Number.isInteger(quantity) && quantity > 0;

const trade = async (req, res, type) => {
  const { stockId, quantity } = req.body;
  if (!mongoose.isValidObjectId(stockId) || !isValidQuantity(quantity)) {
    return res.status(400).json({ message: "A valid stock ID and whole-number quantity are required" });
  }

  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      const user = await User.findById(req.user._id).session(session);
      const stock = await Stock.findById(stockId).session(session);
      if (!user || !stock) {
        const error = new Error("Stock not found"); error.statusCode = 404; throw error;
      }
      const totalAmount = stock.currentPrice * quantity;
      let portfolio = await Portfolio.findOne({ userId: user._id, stockId }).session(session);
      if (type === "BUY") {
        if (user.virtualBalance < totalAmount) {
          const error = new Error("Insufficient balance"); error.statusCode = 400; throw error;
        }
        user.virtualBalance -= totalAmount;
        if (portfolio) {
          const newQuantity = portfolio.quantity + quantity;
          portfolio.averagePrice = ((portfolio.averagePrice * portfolio.quantity) + totalAmount) / newQuantity;
          portfolio.quantity = newQuantity;
        } else portfolio = new Portfolio({ userId: user._id, stockId, quantity, averagePrice: stock.currentPrice });
        await portfolio.save({ session });
      } else {
        if (!portfolio || portfolio.quantity < quantity) {
          const error = new Error("Not enough shares to sell"); error.statusCode = 400; throw error;
        }
        portfolio.quantity -= quantity;
        user.virtualBalance += totalAmount;
        if (portfolio.quantity === 0) await portfolio.deleteOne({ session });
        else await portfolio.save({ session });
      }
      await user.save({ session });
      const created = await Transaction.create([{ userId: user._id, stockId, type, quantity, price: stock.currentPrice, totalAmount }], { session });
      result = { transaction: created[0], balance: user.virtualBalance };
    });
    return res.status(201).json({ message: `${type === "BUY" ? "Stock purchased" : "Stock sold"} successfully`, ...result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message || "Unable to complete trade" });
  } finally { await session.endSession(); }
};

export const buyStock = (req, res) => trade(req, res, "BUY");
export const sellStock = (req, res) => trade(req, res, "SELL");
