require('../utils/loadEnv');
const mongoose = require('mongoose');
const Activity = require('../models/activityModel');
const Product = require('../models/productModel');

const MONGODB_URI = process.env.MONGO_URI;

const seedActivities = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Fetch all products:
    const allProducts = await Product.find();
    const productMap = {}; // our table
    // map product titles to their ObjectIds:
    for (const product of allProducts) {
      productMap[product.title] = product._id;
    }

    console.log('Available product titles in DB:', Object.keys(productMap));

    // 2. Define which products go with which activities:
    const activityLinks = {
      'Doing Nothing': [
        'Pillow That Hurts',
        'Monk In Your Ears',
        'Mask for Sleep',
        'Noise Protector',
        'Tiny Scents Robot',
        'Shoes For Swimming',
        'Portable Container for Water',
        'Portable Spicy Scent',
      ],
      'Thinking on Purpose': ['Virtual Pet'],
      'Sensory Forest Walking': ['White Mud Boots'],
      'Home Decorating': ['Tiny Scents Robot', 'Plants Mist'],
      'Playing with Foods': ['Fruit Cocktail Maker'],
    };

    // 3. Add activities:
    const activities = [
      {
        title: 'Sensory Forest Walking',
        description: 'Move slowly in nature and activate your senses',
        image: 'https://ruta.io/wp-content/uploads/together-by-rutaio.jpg',
      },
      {
        title: 'Home Decorating',
        description:
          'Move around your house and enjoy slowing down time while practising using hands and appreciating your surroundings',
        image: 'https://ruta.io/wp-content/uploads/garden--scaled.jpg',
      },
      {
        title: 'Doing Nothing',
        description: 'Switch off the mind through focusing on the senses',
        image:
          'https://ruta.io/wp-content/uploads/20210728_1034437673044543422901875-scaled-scaled.jpg',
      },
      {
        title: 'Thinking on Purpose',
        description: 'Direct your attention to something positive',
        image: 'https://ruta.io/wp-content/uploads/copy-2.jpg',
      },
      {
        title: 'Playing with Foods',
        description: 'Experiment with new foods and tastes',
        image:
          'https://ruta.io/wp-content/uploads/20211016_100234-scaled-scaled.jpg',
      },
    ];

    // 4. Loop through activities, attach product IDS and save to DB:
    for (const activityData of activities) {
      // look up which products belong to this activity:
      const productTitles = activityLinks[activityData.title] || [];

      // convert product titles to ObjectIds:
      const productIds = productTitles
        .map((title) => productMap[title])
        .filter(Boolean); // skip if product not found

      // attach them to activity:
      activityData.products = productIds;

      // now save activity:
      const exists = await Activity.findOne({ title: activityData.title });
      if (!exists) {
        const activity = new Activity(activityData);
        await activity.save(); // trigger generateSlug
        console.log(`Added: ${activity} -> slug: ${activity.slug}`);
      } else {
        // update existing:
        await Activity.updateOne(
          { title: activityData.title },
          { $set: activityData }
        );
        console.log(`Updated: ${activityData.title}`);
      }
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Adding activities failed:', error);
  }
};

seedActivities();
