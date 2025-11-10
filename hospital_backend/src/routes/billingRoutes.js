const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const billingController = require('../controllers/billingController');

// GET /api/billing - get all billing records
router.get('/', billingController.getAllBilling);

// GET /api/billing/:id - get billing record by ID
router.get('/:id', billingController.getBillingById);

// POST /api/billing - create a new billing record
router.post('/', billingController.createBilling);

// PUT /api/billing/:id - update billing record by ID
router.put('/:id', billingController.updateBilling);

// DELETE /api/billing/:id - delete billing record by ID
router.delete('/:id', billingController.deleteBilling);

module.exports = router;
