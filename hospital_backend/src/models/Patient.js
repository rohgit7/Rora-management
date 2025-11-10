const pool = require('../config/db');

class Patient {
  // Get all patients
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Patients');
    return rows;
  }

  // Get one patient by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Patients WHERE patient_id = ?', [id]);
    return rows[0];  // Return single patient or undefined
  }

  // Create a new patient, data is an object with patient fields
  static async create(data) {
    const { name, gender, dob, address, contact, medical_history } = data;
    const [result] = await pool.query(
      'INSERT INTO Patients (name, gender, dob, address, contact, medical_history) VALUES (?, ?, ?, ?, ?, ?)',
      [name, gender, dob, address, contact, medical_history]
    );
    return result.insertId;  // Return newly created patient's ID
  }

  // Update patient record by ID
  static async update(id, data) {
    const { name, gender, dob, address, contact, medical_history } = data;
    await pool.query(
      'UPDATE Patients SET name=?, gender=?, dob=?, address=?, contact=?, medical_history=? WHERE patient_id=?',
      [name, gender, dob, address, contact, medical_history, id]
    );
  }

  // Delete patient record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Patients WHERE patient_id = ?', [id]);
  }
}

module.exports = Patient;
