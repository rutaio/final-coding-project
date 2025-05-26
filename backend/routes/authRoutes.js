const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// does not work on postman..
router.get('/user', authMiddleware, authController.getCurrentUser);

router.get('/all-users', authMiddleware, authController.getAllUsers);

module.exports = router;
