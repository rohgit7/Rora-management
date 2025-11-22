const Ambulance = require('../models/Ambulance');

module.exports = {
  // GET /api/ambulances - get all ambulances
  async getAllAmbulances(req, res) {
    try {
      const ambulances = await Ambulance.getAll();
      res.status(200).json(ambulances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/ambulances/enriched - ambulances with availability flag
  async getAllAmbulancesEnriched(req, res) {
    try {
      const ambulances = await Ambulance.getAllEnriched();
      res.status(200).json(ambulances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/ambulances/:id - get ambulance by ID
  async getAmbulanceById(req, res) {
    try {
      const ambulance = await Ambulance.getById(req.params.id);
      if (!ambulance) return res.status(404).json({ message: 'Ambulance not found' });
      res.status(200).json(ambulance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/ambulances - create a new ambulance entry
  async createAmbulance(req, res) {
    try {
      const id = await Ambulance.create(req.body);
      res.status(201).json({ message: 'Ambulance created', ambulanceId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/ambulances/:id - update ambulance by ID
  async updateAmbulance(req, res) {
    try {
      await Ambulance.update(req.params.id, req.body);
      res.status(200).json({ message: 'Ambulance updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/ambulances/:id - delete ambulance by ID
  async deleteAmbulance(req, res) {
    try {
      await Ambulance.delete(req.params.id);
      res.status(200).json({ message: 'Ambulance deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
