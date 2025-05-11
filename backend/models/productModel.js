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

    source: {
      type: String,
      enum: ['user', 'api'],
      required: true,
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

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);
