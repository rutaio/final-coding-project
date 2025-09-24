const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.get('/slug/:slug', activityController.getActivityBySlug); // this allows to visit an activity directly via slug

// I want to link activities to products:
router.get('/product/:productId', activityController.getActivitiesByProductId);

module.exports = router;
