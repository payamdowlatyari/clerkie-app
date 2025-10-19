import Loan from "../models/Loan.js";

/**
 * Creates a new loan
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Resolves with a JSON response containing the created loan
 * @throws {Error} - If the request body is invalid or an error occurs while creating the loan
 */
export const createLoan = async (req, res) => {
  try {
    const { user, amount, status } = req.body;
    if (!user || !amount) return res.status(400).json({ error: "User and amount required" });
    const loan = await Loan.create({ user, amount, status });
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieves a list of loans, optionally filtered by status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Resolves with a JSON response containing the list of loans
 * @throws {Error} - If an error occurs while retrieving the loans
 */
export const getLoans = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const loans = await Loan.find(filter).populate("user", "name email");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
