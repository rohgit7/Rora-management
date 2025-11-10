const pool = require('../config/db');

class Ambulance {
  // Get all ambulances
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Ambulance');
    return rows;
  }

  // Get one ambulance by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Ambulance WHERE ambulance_id = ?', [id]);
    return rows[0];
  }

  // Create a new ambulance record
  static async create(data) {
    const { status, driver } = data;
    const [result] = await pool.query(
      'INSERT INTO Ambulance (status, driver) VALUES (?, ?)',
      [status, driver]
    );
    return result.insertId;  // Return the new ambulance ID
  }

  // Update an ambulance record by ID
  static async update(id, data) {
    const { status, driver } = data;
    await pool.query(
      'UPDATE Ambulance SET status=?, driver=? WHERE ambulance_id=?',
      [status, driver, id]
    );
  }

  // Delete an ambulance record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Ambulance WHERE ambulance_id = ?', [id]);
  }
}

module.exports = Ambulance;
