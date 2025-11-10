const Appointment = require('../models/Appointment');

module.exports = {
  // GET /api/appointments - get all appointments
  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.getAll();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/appointments/:id - get appointment by ID
  async getAppointmentById(req, res) {
    try {
      const appointment = await Appointment.getById(req.params.id);
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/appointments - create a new appointment
  async createAppointment(req, res) {
    try {
      const id = await Appointment.create(req.body);
      res.status(201).json({ message: 'Appointment created', appointmentId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/appointments/:id - update appointment by ID
  async updateAppointment(req, res) {
    try {
      await Appointment.update(req.params.id, req.body);
      res.status(200).json({ message: 'Appointment updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/appointments/:id - delete appointment by ID
  async deleteAppointment(req, res) {
    try {
      await Appointment.delete(req.params.id);
      res.status(200).json({ message: 'Appointment deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
