const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/slug/:slug', activityController.getActivityBySlug); // this allows to visit an activity directly via slug

module.exports = router;
