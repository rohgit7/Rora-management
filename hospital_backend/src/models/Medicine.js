const pool = require('../config/db');
const { formatDate } = require('../utils/helpers');

class Medicine {
  // Get all medicines
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Medicine');
    return rows.map((row) => ({
      ...row,
      expiry_date: row.expiry_date ? formatDate(row.expiry_date) : null,
    }));
  }

  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT m.medicine_id, m.name, m.type, m.stock, m.expiry_date,
              COALESCE(SUM(ph.quantity), 0) AS dispensed_qty
       FROM Medicine m
       LEFT JOIN Pharmacy ph ON ph.medicine_id = m.medicine_id
       GROUP BY m.medicine_id`
    );
    return rows.map((row) => ({
      ...row,
      expiry_date: row.expiry_date ? formatDate(row.expiry_date) : null,
    }));
  }

  // Get a single medicine by ID
  static async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM Medicine WHERE medicine_id = ?',
      [id]
    );
    const row = rows[0];
    if (!row) return undefined;
    return {
      ...row,
      expiry_date: row.expiry_date ? formatDate(row.expiry_date) : null,
    };
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
