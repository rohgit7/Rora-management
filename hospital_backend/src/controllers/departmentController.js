const Department = require('../models/Department');

module.exports = {
  // GET /api/departments - get all departments
  async getAllDepartments(req, res) {
    try {
      const departments = await Department.getAll();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/departments/enriched - departments with doctor counts
  async getAllDepartmentsEnriched(req, res) {
    try {
      const departments = await Department.getAllEnriched();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/departments/:id - get a department by ID
  async getDepartmentById(req, res) {
    try {
      const department = await Department.getById(req.params.id);
      if (!department) return res.status(404).json({ message: 'Department not found' });
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/departments - create a new department
  async createDepartment(req, res) {
    try {
      const id = await Department.create(req.body);
      res.status(201).json({ message: 'Department created', departmentId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/departments/:id - update a department by ID
  async updateDepartment(req, res) {
    try {
      await Department.update(req.params.id, req.body);
      res.status(200).json({ message: 'Department updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/departments/:id - delete a department by ID
  async deleteDepartment(req, res) {
    try {
      await Department.delete(req.params.id);
      res.status(200).json({ message: 'Department deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
