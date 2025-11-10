const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const patientController = require('../controllers/patientController');

// GET /api/patients
router.get('/', patientController.getAllPatients);

// GET /api/patients/:id
router.get('/:id', patientController.getPatientById);

// POST /api/patients
router.post('/', patientController.createPatient);

// PUT /api/patients/:id
router.put('/:id', patientController.updatePatient);

// DELETE /api/patients/:id
router.delete('/:id', patientController.deletePatient);

module.exports = router;
