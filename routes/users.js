import express from "express";
import { createUser, getUsers, getUserSummary } from "../controllers/userController.js";

const router = express.Router();

// Define user routes
router.post("/", createUser);
router.get("/", getUsers);

// Define user summary route
router.get("/:id/summary", getUserSummary);

export default router;
