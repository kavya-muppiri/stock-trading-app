import Transaction from "../models/Transaction.js";

// Get All Transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId", "name email")
      .populate("stockId", "symbol companyName currentPrice");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};