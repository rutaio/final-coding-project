require('../utils/loadEnv');
const mongoose = require('mongoose');
const Activity = require('../models/activityModel');
const Product = require('../models/productModel');

const MONGODB_URI = process.env.MONGO_URI;

const seedActivities = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Fetch some existing products, and divide them for easier matching with sample activities below:
    const allProducts = await Product.find();
    const firstThree = allProducts.slice(0, 3);
    const nextThree = allProducts.slice(3, 6);

    // Add sample activities:
    const activities = [
      {
        title: 'Sensory Forest Walking',
        description: 'Move slowly in nature and activate your senses',
        image: '#',
        products: firstThree.map((p) => p._id), // link with products, but only store their IDs as a field
      },
      {
        title: 'Home Decorating',
        description:
          'Move around your house and enjoy slowing down time while practising using hands and appreciating your surroundings',
        image: '#',
        products: nextThree.map((p) => p._id),
      },
    ];

    for (const activityData of activities) {
      const activity = new Activity(activityData);
      await activity.save(); // triggers generateSlug
      console.log(`Added: ${activity.title} → slug: ${activity.slug}`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Adding activities failed:', error);
  }
};

seedActivities();
