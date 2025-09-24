const Activity = require('../models/activityModel');

exports.getActivityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const activity = await Activity.findOne({ slug });

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error('Error fetching activity by slug:', error);
    res.status(500).json({ error: 'Server error fetching activity by slug' });
  }
};

// I want to show related activities inside each product, so I need this:
exports.getActivitiesByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const activities = await Activity.find({ products: productId });
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities by productId:', error);
    res.status(500).json({ error: 'Server error fetching activities' });
  }
};
