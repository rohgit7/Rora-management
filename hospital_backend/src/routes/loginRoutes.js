const express = require('express');
const router = express.Router();
const { login, logout, verify } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

// POST /api/login
router.post('/', async (req, res) => {
  try {
    await login(req, res);
  } catch (err) {
    console.error('Login route error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /api/logout (public endpoint, logout handled client-side)
router.post('/logout', async (req, res) => {
  try {
    await logout(req, res);
  } catch (err) {
    console.error('Logout route error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET /api/verify (protected endpoint to verify token validity)
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    await verify(req, res);
  } catch (err) {
    console.error('Verify route error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
