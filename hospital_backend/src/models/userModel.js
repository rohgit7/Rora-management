const pool = require('../db');

// Create new user
async function createUser({ name, email, password }) {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [name, email, password]);
  return result.insertId;
}

// Find user by email
async function findUserByEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await pool.query(sql, [email]);
  return rows[0]; // undefined if not found
}

module.exports = {
  createUser,
  findUserByEmail
};
