const pool = require('../config/db');

class Appointment {
  // Get all appointments
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Appointments');
    return rows;
  }

  // Get one appointment by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Appointments WHERE appointment_id = ?', [id]);
    return rows[0];
  }

  // Create a new appointment
  static async create(data) {
    const { patient_id, doctor_id, appointment_date, status } = data;
    const [result] = await pool.query(
      'INSERT INTO Appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)',
      [patient_id, doctor_id, appointment_date, status]
    );
    return result.insertId;
  }

  // Update an appointment by ID
  static async update(id, data) {
    const { patient_id, doctor_id, appointment_date, status } = data;
    await pool.query(
      'UPDATE Appointments SET patient_id=?, doctor_id=?, appointment_date=?, status=? WHERE appointment_id=?',
      [patient_id, doctor_id, appointment_date, status, id]
    );
  }

  // Delete an appointment by ID
  static async delete(id) {
    await pool.query('DELETE FROM Appointments WHERE appointment_id = ?', [id]);
  }
}

module.exports = Appointment;
