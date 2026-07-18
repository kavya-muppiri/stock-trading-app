import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: { validator: Number.isInteger, message: "Quantity must be a whole number" },
    },

    averagePrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

portfolioSchema.index({ userId: 1, stockId: 1 }, { unique: true });

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;
