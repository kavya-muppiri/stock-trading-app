import User from "../models/User.js";
import Stock from "../models/Stock.js";
import Portfolio from "../models/Portfolio.js";
import Transaction from "../models/Transaction.js";

// Buy Stock
export const buyStock = async (req, res) => {
  try {
    const { userId, stockId, quantity } = req.body;

    const user = await User.findById(userId);
    const stock = await Stock.findById(stockId);

    if (!user || !stock) {
      return res.status(404).json({
        message: "User or Stock not found",
      });
    }

    const totalAmount = stock.currentPrice * quantity;

    if (user.virtualBalance < totalAmount) {
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    user.virtualBalance -= totalAmount;
    await user.save();

    let portfolio = await Portfolio.findOne({ userId, stockId });

    if (portfolio) {
      portfolio.quantity += quantity;
      portfolio.averagePrice = stock.currentPrice;
      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        userId,
        stockId,
        quantity,
        averagePrice: stock.currentPrice,
      });
    }

    await Transaction.create({
      userId,
      stockId,
      type: "BUY",
      quantity,
      price: stock.currentPrice,
      totalAmount,
    });

    res.status(200).json({
      message: "Stock purchased successfully",
      portfolio,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Sell Stock
export const sellStock = async (req, res) => {
  try {
    const { userId, stockId, quantity } = req.body;

    const user = await User.findById(userId);
    const stock = await Stock.findById(stockId);

    const portfolio = await Portfolio.findOne({ userId, stockId });

    if (!portfolio || portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough stocks to sell",
      });
    }

    const totalAmount = stock.currentPrice * quantity;

    portfolio.quantity -= quantity;
    await portfolio.save();

    user.virtualBalance += totalAmount;
    await user.save();

    await Transaction.create({
      userId,
      stockId,
      type: "SELL",
      quantity,
      price: stock.currentPrice,
      totalAmount,
    });

    res.status(200).json({
      message: "Stock sold successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};