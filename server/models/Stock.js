import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    change: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
