import express from "express";
import { createLoan, getLoans } from "../controllers/loanController.js";

const router = express.Router();

// Define loan routes
router.post("/", createLoan);
router.get("/", getLoans);

export default router;
