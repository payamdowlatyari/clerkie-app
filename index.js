import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import loanRoutes from "./routes/loans.js";

import "./config/database.js"; // initialize DB connection

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
app.use(express.json());

// Define routes
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);

// Default routes
app.get("/", (req, res) => res.send("Loan Manager API running"));
app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
