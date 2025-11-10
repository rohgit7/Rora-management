const Doctor = require('../models/Doctor');

module.exports = {
  // GET /api/doctors - get all doctors
  async getAllDoctors(req, res) {
    try {
      const doctors = await Doctor.getAll();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/doctors/:id - get a doctor by ID
  async getDoctorById(req, res) {
    try {
      const doctor = await Doctor.getById(req.params.id);
      if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/doctors - create a new doctor
  async createDoctor(req, res) {
    try {
      const id = await Doctor.create(req.body);
      res.status(201).json({ message: 'Doctor created', doctorId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/doctors/:id - update a doctor by ID
  async updateDoctor(req, res) {
    try {
      await Doctor.update(req.params.id, req.body);
      res.status(200).json({ message: 'Doctor updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/doctors/:id - delete a doctor by ID
  async deleteDoctor(req, res) {
    try {
      await Doctor.delete(req.params.id);
      res.status(200).json({ message: 'Doctor deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
