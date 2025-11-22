const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// POST /api/register
router.post('/', async (req, res) => {
  try {
    await register(req, res);
  } catch (err) {
    console.error('Register route error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
