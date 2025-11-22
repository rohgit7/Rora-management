const pool = require('../config/db');

class Billing {
  // Get all billing records
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Billing');
    return rows;
  }

  // Get all billing records with patient name
  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT b.bill_id, b.patient_id, b.appointment_id, b.amount, b.insurance_provider, b.status,
              p.name AS patient_name
       FROM Billing b
       JOIN Patients p ON b.patient_id = p.patient_id
       ORDER BY b.bill_id DESC`
    );
    return rows;
  }

  // Recent billing records (latest)
  static async getRecent(limit = 5) {
    const [rows] = await pool.query(
      `SELECT b.bill_id, b.patient_id, b.appointment_id, b.amount, b.insurance_provider, b.status,
              p.name AS patient_name
       FROM Billing b
       JOIN Patients p ON b.patient_id = p.patient_id
       ORDER BY b.bill_id DESC
       LIMIT ?`,
      [Number(limit) || 5]
    );
    return rows;
  }

  // Get one billing record by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Billing WHERE bill_id = ?', [id]);
    return rows[0];
  }

  // Create a new billing record
  static async create(data) {
    const { patient_id, appointment_id, amount, insurance_provider, status } = data;
    const [result] = await pool.query(
      'INSERT INTO Billing (patient_id, appointment_id, amount, insurance_provider, status) VALUES (?, ?, ?, ?, ?)',
      [patient_id, appointment_id, amount, insurance_provider, status]
    );
    return result.insertId;  // Return new bill ID
  }

  // Update a billing record by ID
  static async update(id, data) {
    const { patient_id, appointment_id, amount, insurance_provider, status } = data;
    await pool.query(
      'UPDATE Billing SET patient_id=?, appointment_id=?, amount=?, insurance_provider=?, status=? WHERE bill_id=?',
      [patient_id, appointment_id, amount, insurance_provider, status, id]
    );
  }

  // Delete a billing record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Billing WHERE bill_id = ?', [id]);
  }
}

module.exports = Billing;
