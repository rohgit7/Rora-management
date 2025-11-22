const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const ambulanceController = require('../controllers/ambulanceController');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/ambulances - get all ambulances
router.get('/', ambulanceController.getAllAmbulances);

// GET /api/ambulances/enriched - availability flag
router.get('/enriched', ambulanceController.getAllAmbulancesEnriched);

// GET /api/ambulances/:id - get ambulance by ID
router.get('/:id', ambulanceController.getAmbulanceById);

// POST /api/ambulances - create a new ambulance
router.post('/', ambulanceController.createAmbulance);

// PUT /api/ambulances/:id - update ambulance by ID
router.put('/:id', ambulanceController.updateAmbulance);

// DELETE /api/ambulances/:id - delete ambulance by ID
router.delete('/:id', ambulanceController.deleteAmbulance);

module.exports = router;
