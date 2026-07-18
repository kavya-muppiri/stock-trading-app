import express from "express";
import { getTransactions } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get All Transactions
router.get("/", protect, getTransactions);

export default router;
