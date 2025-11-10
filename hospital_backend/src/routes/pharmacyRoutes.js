const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const pharmacyController = require('../controllers/pharmacyController');

// GET /api/pharmacies - get all pharmacy records
router.get('/', pharmacyController.getAllPharmacies);

// GET /api/pharmacies/:id - get a pharmacy record by ID
router.get('/:id', pharmacyController.getPharmacyById);

// POST /api/pharmacies - create a new pharmacy record
router.post('/', pharmacyController.createPharmacy);

// PUT /api/pharmacies/:id - update pharmacy record by ID
router.put('/:id', pharmacyController.updatePharmacy);

// DELETE /api/pharmacies/:id - delete pharmacy record by ID
router.delete('/:id', pharmacyController.deletePharmacy);

module.exports = router;
