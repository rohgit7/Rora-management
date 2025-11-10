const pool = require('../config/db');

class Doctor {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Doctors');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Doctors WHERE doctor_id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, specialty, contact, dept_id } = data;
    const [result] = await pool.query(
      'INSERT INTO Doctors (name, specialty, contact, dept_id) VALUES (?, ?, ?, ?)',
      [name, specialty, contact, dept_id]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { name, specialty, contact, dept_id } = data;
    await pool.query(
      'UPDATE Doctors SET name=?, specialty=?, contact=?, dept_id=? WHERE doctor_id=?',
      [name, specialty, contact, dept_id, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM Doctors WHERE doctor_id = ?', [id]);
  }
}

module.exports = Doctor;
