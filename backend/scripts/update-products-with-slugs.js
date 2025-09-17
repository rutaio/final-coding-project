// my simulation:
// require('dotenv').config();
// const mongoose = require('mongoose');
// const slugify = require('slugify');
// const Product = require('../models/productModel');

// const MONGODB_URI = process.env.MONGO_URI;

// const runSimulatedUpdate = async () => {
//  try {
//    await mongoose.connect(MONGODB_URI);
//    console.log('Connected to MongoDB');

//    const products = await Product.find();

//    for (const product of products) {
//      const slug = slugify(product.title, { lower: true });
//      console.log(`Would update: ${product.title} → slug: ${slug}`);
//    }

//    await mongoose.disconnect();
//    console.log('Disconnected from MongoDB');
//  } catch (error) {
//    console.error('Error updating products:', error);
//  }
// };

// runSimulatedUpdate();

// MY REAL SCRIPT:
require('../utils/loadEnv');
const mongoose = require('mongoose');
const slugify = require('slugify');
const Product = require('../models/productModel');

const MONGODB_URI = process.env.MONGO_URI;

const addSlugsToProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find();

    for (const product of products) {
      if (!product.slug) {
        const generatedSlug = slugify(product.title, { lower: true });

        product.slug = generatedSlug;
        await product.save();

        console.log(`Updated: ${product.title} → slug: ${generatedSlug}`);
      }
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error updating products:', error);
  }
};

addSlugsToProducts();
