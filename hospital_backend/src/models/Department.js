const pool = require('../config/db');

class Department {
  // Get all departments
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Departments');
    return rows;
  }

  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT d.dept_id, d.name, d.location,
              COUNT(doc.doctor_id) AS doctor_count
       FROM Departments d
       LEFT JOIN Doctors doc ON doc.dept_id = d.dept_id
       GROUP BY d.dept_id`
    );
    return rows;
  }

  // Get one department by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Departments WHERE dept_id = ?', [id]);
    return rows[0];
  }

  // Create a new department
  static async create(data) {
    const { name, location } = data;
    const [result] = await pool.query(
      'INSERT INTO Departments (name, location) VALUES (?, ?)',
      [name, location]
    );
    return result.insertId;  // Return new department ID
  }

  // Update a department record by ID
  static async update(id, data) {
    const { name, location } = data;
    await pool.query(
      'UPDATE Departments SET name=?, location=? WHERE dept_id=?',
      [name, location, id]
    );
  }

  // Delete a department record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Departments WHERE dept_id = ?', [id]);
  }
}

module.exports = Department;
