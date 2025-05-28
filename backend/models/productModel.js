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

    // I want to keep this for the future features when I integrate adding data through APIs:
    source: {
      type: String,
      enum: ['user', 'api'],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return this.source === 'user';
      },
    },

    apiSource: {
      type: String,
      required: function () {
        return this.source === 'api';
      },
    },

    status: {
      type: String,
      enum: ['under review', 'approved', 'rejected'],
      default: 'under review',
    },
  },
  { timestamps: true, collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);
