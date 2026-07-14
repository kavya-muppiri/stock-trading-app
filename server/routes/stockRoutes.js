import express from "express";
import {
  getAllStocks,
  getStockById,
} from "../controllers/stockControllers.js";

const router = express.Router();

// Get all stocks
router.get("/", getAllStocks);

// Get stock by ID
router.get("/:id", getStockById);

export default router;