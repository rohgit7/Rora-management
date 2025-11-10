const pool = require('../config/db');

class Medicine {
  // Get all medicines
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Medicine');
    return rows;
  }

  // Get a single medicine by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Medicine WHERE medicine_id = ?', [id]);
    return rows[0];
  }

  // Create a new medicine record
  static async create(data) {
    const { name, type, stock, expiry_date } = data;
    const [result] = await pool.query(
      'INSERT INTO Medicine (name, type, stock, expiry_date) VALUES (?, ?, ?, ?)',
      [name, type, stock, expiry_date]
    );
    return result.insertId;  // Return the new medicine ID
  }

  // Update an existing medicine record by ID
  static async update(id, data) {
    const { name, type, stock, expiry_date } = data;
    await pool.query(
      'UPDATE Medicine SET name=?, type=?, stock=?, expiry_date=? WHERE medicine_id=?',
      [name, type, stock, expiry_date, id]
    );
  }

  // Delete a medicine record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Medicine WHERE medicine_id = ?', [id]);
  }
}

module.exports = Medicine;
