const Medicine = require('../models/Medicine');

module.exports = {
  // GET /api/medicines - get all medicines
  async getAllMedicines(req, res) {
    try {
      const medicines = await Medicine.getAll();
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/medicines/:id - get a medicine by ID
  async getMedicineById(req, res) {
    try {
      const medicine = await Medicine.getById(req.params.id);
      if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/medicines - create a new medicine
  async createMedicine(req, res) {
    try {
      const id = await Medicine.create(req.body);
      res.status(201).json({ message: 'Medicine created', medicineId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/medicines/:id - update a medicine by ID
  async updateMedicine(req, res) {
    try {
      await Medicine.update(req.params.id, req.body);
      res.status(200).json({ message: 'Medicine updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/medicines/:id - delete a medicine by ID
  async deleteMedicine(req, res) {
    try {
      await Medicine.delete(req.params.id);
      res.status(200).json({ message: 'Medicine deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
