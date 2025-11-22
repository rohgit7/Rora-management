const Room = require('../models/Room');

module.exports = {
  // GET /api/rooms - get all rooms
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.getAll();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/rooms/enriched - rooms with availability flag
  async getAllRoomsEnriched(req, res) {
    try {
      const rooms = await Room.getAllEnriched();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/rooms/:id - get a room by ID
  async getRoomById(req, res) {
    try {
      const room = await Room.getById(req.params.id);
      if (!room) return res.status(404).json({ message: 'Room not found' });
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/rooms - create a new room
  async createRoom(req, res) {
    try {
      const id = await Room.create(req.body);
      res.status(201).json({ message: 'Room created', roomId: id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/rooms/:id - update a room by ID
  async updateRoom(req, res) {
    try {
      await Room.update(req.params.id, req.body);
      res.status(200).json({ message: 'Room updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/rooms/:id - delete a room by ID
  async deleteRoom(req, res) {
    try {
      await Room.delete(req.params.id);
      res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
