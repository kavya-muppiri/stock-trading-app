import Stock from "../models/Stock.js";

// Get All Stocks
export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();

    res.status(200).json(stocks);
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid stock ID" });
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Stock
export const getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
