const Patient = require('../models/Patient');

module.exports = {
  // GET /api/patients - get all patients
  async getAllPatients(req, res) {
    try {
      const patients = await Patient.getAll();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/patients/:id - get a patient by ID
  async getPatientById(req, res) {
    try {
      const patient = await Patient.getById(req.params.id);
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/patients - create a new patient
  async createPatient(req, res) {
    try {
      const id = await Patient.create(req.body);
      res.status(201).json({ message: 'Patient created', patientId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/patients/:id - update a patient by ID
  async updatePatient(req, res) {
    try {
      await Patient.update(req.params.id, req.body);
      res.status(200).json({ message: 'Patient updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/patients/:id - delete a patient by ID
  async deletePatient(req, res) {
    try {
      await Patient.delete(req.params.id);
      res.status(200).json({ message: 'Patient deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
