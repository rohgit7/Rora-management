const Pharmacy = require('../models/Pharmacy');

module.exports = {
  // GET /api/pharmacies - get all pharmacy records
  async getAllPharmacies(req, res) {
    try {
      const pharmacies = await Pharmacy.getAll();
      res.status(200).json(pharmacies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/pharmacies/:id - get a pharmacy record by ID
  async getPharmacyById(req, res) {
    try {
      const pharmacy = await Pharmacy.getById(req.params.id);
      if (!pharmacy) return res.status(404).json({ message: 'Pharmacy record not found' });
      res.status(200).json(pharmacy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/pharmacies - create a new pharmacy record
  async createPharmacy(req, res) {
    try {
      const id = await Pharmacy.create(req.body);
      res.status(201).json({ message: 'Pharmacy record created', pharmacyId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/pharmacies/:id - update pharmacy record by ID
  async updatePharmacy(req, res) {
    try {
      await Pharmacy.update(req.params.id, req.body);
      res.status(200).json({ message: 'Pharmacy record updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/pharmacies/:id - delete pharmacy record by ID
  async deletePharmacy(req, res) {
    try {
      await Pharmacy.delete(req.params.id);
      res.status(200).json({ message: 'Pharmacy record deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
