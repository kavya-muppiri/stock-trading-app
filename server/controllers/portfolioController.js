import Portfolio from "../models/Portfolio.js";

// Get User Portfolio
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ userId: req.user._id })
      .populate("stockId", "symbol companyName currentPrice");

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
