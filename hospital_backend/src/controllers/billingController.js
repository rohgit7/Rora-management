const Billing = require('../models/Billing');

module.exports = {
  // GET /api/billing - get all billing records
  async getAllBilling(req, res) {
    try {
      const billingRecords = await Billing.getAll();
      res.status(200).json(billingRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/billing/enriched - get all billing with patient name
  async getAllBillingEnriched(req, res) {
    try {
      const billingRecords = await Billing.getAllEnriched();
      res.status(200).json(billingRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/billing/:id - get billing record by ID
  async getBillingById(req, res) {
    try {
      const bill = await Billing.getById(req.params.id);
      if (!bill) return res.status(404).json({ message: 'Billing record not found' });
      res.status(200).json(bill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/billing - create a new billing record
  async createBilling(req, res) {
    try {
      const id = await Billing.create(req.body);
      res.status(201).json({ message: 'Billing record created', billId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/billing/:id - update a billing record by ID
  async updateBilling(req, res) {
    try {
      await Billing.update(req.params.id, req.body);
      res.status(200).json({ message: 'Billing record updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/billing/:id - delete a billing record by ID
  async deleteBilling(req, res) {
    try {
      await Billing.delete(req.params.id);
      res.status(200).json({ message: 'Billing record deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
