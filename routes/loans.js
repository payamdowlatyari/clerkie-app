const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Create a new loan
router.post('/', loanController.createLoan);

// Get all loans
router.get('/', loanController.getAllLoans);

// Get a single loan by ID
router.get('/:id', loanController.getLoanById);

// Get all loans for a specific user
router.get('/user/:userId', loanController.getLoansByUserId);

// Update a loan by ID
router.put('/:id', loanController.updateLoan);

// Delete a loan by ID
router.delete('/:id', loanController.deleteLoan);

module.exports = router;
