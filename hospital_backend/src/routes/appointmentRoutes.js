const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const appointmentController = require('../controllers/appointmentController');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/appointments - get all appointments
router.get('/', appointmentController.getAllAppointments);

// GET /api/appointments/enriched - get all appointments with join info
router.get('/enriched', appointmentController.getAllAppointmentsEnriched);

// GET /api/appointments/:id - get appointment by ID
router.get('/:id', appointmentController.getAppointmentById);

// POST /api/appointments - create a new appointment
router.post('/', appointmentController.createAppointment);

// PUT /api/appointments/:id - update appointment by ID
router.put('/:id', appointmentController.updateAppointment);

// DELETE /api/appointments/:id - delete appointment by ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
