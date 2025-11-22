const pool = require('../config/db');

class Room {
  // Get all rooms
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM Rooms');
    return rows;
  }

  static async getAllEnriched() {
    const [rows] = await pool.query(
      `SELECT r.room_id, r.type, r.status, r.capacity,
              CASE WHEN r.status = 'Available' THEN 1 ELSE 0 END AS is_available
       FROM Rooms r`
    );
    return rows;
  }

  // Get one room by ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Rooms WHERE room_id = ?', [id]);
    return rows[0];
  }

  // Create a new room record
  static async create(data) {
    const { type, status, capacity } = data;
    const [result] = await pool.query(
      'INSERT INTO Rooms (type, status, capacity) VALUES (?, ?, ?)',
      [type, status, capacity]
    );
    return result.insertId;  // Return new room ID
  }

  // Update an existing room record by ID
  static async update(id, data) {
    const { type, status, capacity } = data;
    await pool.query(
      'UPDATE Rooms SET type=?, status=?, capacity=? WHERE room_id=?',
      [type, status, capacity, id]
    );
  }

  // Delete a room record by ID
  static async delete(id) {
    await pool.query('DELETE FROM Rooms WHERE room_id = ?', [id]);
  }
}

module.exports = Room;
