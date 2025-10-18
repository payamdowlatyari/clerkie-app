const Loan = require('../models/Loan');
const User = require('../models/User');

// Create a new loan
exports.createLoan = async (req, res) => {
  try {
    // Verify that the user exists
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId', 'name email');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('userId', 'name email');
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all loans for a specific user
exports.getLoansByUserId = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.params.userId }).populate('userId', 'name email');
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a loan by ID
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a loan by ID
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
