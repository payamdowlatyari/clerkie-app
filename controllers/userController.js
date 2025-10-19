import User from "../models/User.js";
import Loan from "../models/Loan.js";
import mongoose from "mongoose";

/**
 * Creates a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Resolves with a JSON response containing the created user
 * @throws {Error} - If the request body is invalid or an error occurs while creating the user
 */
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email required" });
    const user = await User.create({ name, email });
    console.log("User created:", user);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a list of all users sorted by creation date in descending order.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Resolves with a JSON response containing the list of users
 * @throws {Error} - If an error occurs while retrieving the users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a summary of loans for a specific user, including total loan amount and count.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Resolves with a JSON response containing the user's loan summary
 * @throws {Error} - If the user is not found or an error occurs while retrieving the summary
 */
export const getUserSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const summary = await Loan.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$amount" },
          totalLoans: { $sum: 1 }
        }
      }
    ]);

    const result = summary[0] || { totalAmount: 0, totalLoans: 0 };
    res.json({ userId: id, name: user.name, ...result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
