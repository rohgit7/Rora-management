const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const departmentController = require('../controllers/departmentController');

// GET /api/departments - get all departments
router.get('/', departmentController.getAllDepartments);

// GET /api/departments/:id - get a department by ID
router.get('/:id', departmentController.getDepartmentById);

// POST /api/departments - create a new department
router.post('/', departmentController.createDepartment);

// PUT /api/departments/:id - update a department by ID
router.put('/:id', departmentController.updateDepartment);

// DELETE /api/departments/:id - delete a department by ID
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
