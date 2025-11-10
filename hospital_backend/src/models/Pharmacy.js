const pool = require('../config/db');

class Pharmacy {
  // Get all pharmacy records
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Pharmacy');
    return rows;
  }

  // Get one pharmacy record by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Pharmacy WHERE pharmacy_id = ?', [id]);
    return rows[0];
  }

  // Create a new pharmacy record
  static async create(data) {
    const { patient_id, medicine_id, quantity, dispense_date } = data;
    const [result] = await pool.query(
      'INSERT INTO Pharmacy (patient_id, medicine_id, quantity, dispense_date) VALUES (?, ?, ?, ?)',
      [patient_id, medicine_id, quantity, dispense_date]
    );
    return result.insertId;  // Return newly created pharmacy record ID
  }

  // Update a pharmacy record by ID
  static async update(id, data) {
    const { patient_id, medicine_id, quantity, dispense_date } = data;
    await pool.query(
      'UPDATE Pharmacy SET patient_id=?, medicine_id=?, quantity=?, dispense_date=? WHERE pharmacy_id=?',
      [patient_id, medicine_id, quantity, dispense_date, id]
    );
  }

  // Delete a pharmacy record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Pharmacy WHERE pharmacy_id = ?', [id]);
  }
}

module.exports = Pharmacy;
