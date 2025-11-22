const pool = require('../config/db');
const { formatDate } = require('../utils/helpers');

class Pharmacy {
  // Get all pharmacy records
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Pharmacy');
    return rows.map((row) => ({
      ...row,
      dispense_date: row.dispense_date
        ? formatDate(row.dispense_date)
        : null,
    }));
  }

  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT ph.pharmacy_id, ph.patient_id, ph.medicine_id, ph.quantity, ph.dispense_date,
              p.name AS patient_name, m.name AS medicine_name, m.type AS medicine_type
       FROM Pharmacy ph
       JOIN Patients p ON ph.patient_id = p.patient_id
       JOIN Medicine m ON ph.medicine_id = m.medicine_id`
    );
    return rows.map((row) => ({
      ...row,
      dispense_date: row.dispense_date
        ? formatDate(row.dispense_date)
        : null,
    }));
  }

  // Get one pharmacy record by ID
  static async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM Pharmacy WHERE pharmacy_id = ?',
      [id]
    );
    const row = rows[0];
    if (!row) return undefined;
    return {
      ...row,
      dispense_date: row.dispense_date
        ? formatDate(row.dispense_date)
        : null,
    };
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
