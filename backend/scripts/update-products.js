// THIS IS MY SIMULATION:
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Product = require('../models/productModel');

// const MONGODB_URI = process.env.MONGO_URI;

// const runSimulatedUpdate = async () => {
//  try {
//    await mongoose.connect(MONGODB_URI);
//    console.log('Connected to MongoDB');

//    const products = await Product.find();
//    console.log(`Found ${products.length} products`);

//    products.forEach((product) => {
//      console.log(`Would update: ${product.title} gets a maker added`);
// });

//  await mongoose.disconnect();
//  console.log('Disconnected from MongoDB');
// } catch (err) {
//  console.error('Error:', err);
// }
// };

// runSimulatedUpdate();

// MY REAL SCRIPT:
require('../utils/loadEnv');
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const MONGODB_URI = process.env.MONGO_URI;

const updateProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Only 5 products to update with the maker:
    const updates = [
      { title: 'Monk In Your Ears', maker: 'Headspace' },
      { title: 'Pillow That Hurts', maker: 'Pranamat' },
      { title: 'Virtual Pet', maker: 'Finch' },
      { title: 'Noise Protector', maker: 'Sony' },
    ];

    for (const item of updates) {
      const updated = await Product.findOneAndUpdate(
        { title: item.title },
        { $set: { maker: item.maker } }, // This is a MongoDB update operator, $set means: “Set the value of a field.”
        { new: true } // This is a Mongoose option (not MongoDB), which means return the updated product, not the original
      );

      if (updated) {
        console.log(`Updated: ${updated.title} → maker: ${updated.maker}`);
      } else {
        console.log(`Not found: ${item.title}`);
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error updating products:', error);
  }
};

updateProducts();
