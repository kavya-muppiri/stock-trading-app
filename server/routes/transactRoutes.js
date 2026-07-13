import express from "express";
import { getTransactions } from "../controllers/transactionController.js";

const router = express.Router();

// Get All Transactions
router.get("/", getTransactions);

export default router;