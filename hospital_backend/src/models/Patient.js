const pool = require('../config/db');
const { formatDate } = require('../utils/helpers');

class Patient {
  // Get all patients
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Patients');
    return rows.map((row) => ({
      ...row,
      dob: row.dob ? formatDate(row.dob) : null,
    }));
  }

  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT p.*, 
              (SELECT COUNT(*) FROM Billing b WHERE b.patient_id = p.patient_id AND b.status = 'Pending') AS pending_bills,
              (SELECT COUNT(*) FROM Appointments a WHERE a.patient_id = p.patient_id) AS appointment_count
       FROM Patients p`
    );
    return rows.map((row) => ({
      ...row,
      dob: row.dob ? formatDate(row.dob) : null,
    }));
  }

  // Get one patient by ID
  static async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM Patients WHERE patient_id = ?',
      [id]
    );
    const row = rows[0];  // Return single patient or undefined
    if (!row) return undefined;
    return {
      ...row,
      dob: row.dob ? formatDate(row.dob) : null,
    };
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
  let { name, gender, dob, address, contact, medical_history } = data;

  // Convert empty or invalid DOB to NULL
  if (!dob || dob === "" || dob === "null") dob = null;

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
