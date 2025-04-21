const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    materials: {
      type: Array,
      required: true,
      trim: true,
    },
    usage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true, collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);

