const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const roomController = require('../controllers/roomController');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/rooms - get all rooms
router.get('/', roomController.getAllRooms);

// GET /api/rooms/enriched - availability flag
router.get('/enriched', roomController.getAllRoomsEnriched);

// GET /api/rooms/:id - get a room by ID
router.get('/:id', roomController.getRoomById);

// POST /api/rooms - create a new room
router.post('/', roomController.createRoom);

// PUT /api/rooms/:id - update a room by ID
router.put('/:id', roomController.updateRoom);

// DELETE /api/rooms/:id - delete a room by ID
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
