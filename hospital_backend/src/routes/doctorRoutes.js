const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const doctorController = require('../controllers/doctorController');

// GET /api/doctors - get all doctors
router.get('/', doctorController.getAllDoctors);

// GET /api/doctors/:id - get a doctor by ID
router.get('/:id', doctorController.getDoctorById);

// POST /api/doctors - create a new doctor
router.post('/', doctorController.createDoctor);

// PUT /api/doctors/:id - update a doctor by ID
router.put('/:id', doctorController.updateDoctor);

// DELETE /api/doctors/:id - delete a doctor by ID
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
