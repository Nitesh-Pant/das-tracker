const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserData);

module.exports = router;
