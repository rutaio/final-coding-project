const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/user', authMiddleware, authController.getCurrentUser);

router.get('/all-users', authMiddleware, authController.getAllUsers);

router.put('/edit-role/:userId', authMiddleware, authController.editUserRole);

module.exports = router;
