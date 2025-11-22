const pool = require('../config/db');
const { formatDate } = require('../utils/helpers');

class Appointment {
  // Get all appointments
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Appointments');
    return rows.map((row) => ({
      ...row,
      appointment_date: row.appointment_date
        ? formatDate(row.appointment_date)
        : null,
    }));
  }

  // Get all appointments with patient and doctor names
  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT a.appointment_id, a.patient_id, a.doctor_id, a.appointment_date, a.status,
              p.name AS patient_name, d.name AS doctor_name
       FROM Appointments a
       JOIN Patients p ON a.patient_id = p.patient_id
       JOIN Doctors d ON a.doctor_id = d.doctor_id`
    );
    return rows.map((row) => ({
      ...row,
      appointment_date: row.appointment_date
        ? formatDate(row.appointment_date)
        : null,
    }));
  }

  // Upcoming appointments (next ones) with joins
  static async getUpcoming(limit = 5) {
    const [rows] = await pool.query(
      `SELECT a.appointment_id, a.patient_id, a.doctor_id, a.appointment_date, a.status,
              p.name AS patient_name, d.name AS doctor_name
       FROM Appointments a
       JOIN Patients p ON a.patient_id = p.patient_id
       JOIN Doctors d ON a.doctor_id = d.doctor_id
       WHERE a.appointment_date >= NOW()
       ORDER BY a.appointment_date ASC
       LIMIT ?`,
      [Number(limit) || 5]
    );
    return rows.map((row) => ({
      ...row,
      appointment_date: row.appointment_date
        ? formatDate(row.appointment_date)
        : null,
    }));
  }

  // Get one appointment by ID
  static async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM Appointments WHERE appointment_id = ?',
      [id]
    );
    const row = rows[0];
    if (!row) return undefined;
    return {
      ...row,
      appointment_date: row.appointment_date
        ? formatDate(row.appointment_date)
        : null,
    };
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
