const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const medicineController = require('../controllers/medicineController');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/medicines - get all medicines
router.get('/', medicineController.getAllMedicines);

// GET /api/medicines/enriched - with dispensed totals
router.get('/enriched', medicineController.getAllMedicinesEnriched);

// GET /api/medicines/:id - get a medicine by ID
router.get('/:id', medicineController.getMedicineById);

// POST /api/medicines - create a new medicine
router.post('/', medicineController.createMedicine);

// PUT /api/medicines/:id - update a medicine by ID
router.put('/:id', medicineController.updateMedicine);

// DELETE /api/medicines/:id - delete a medicine by ID
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
