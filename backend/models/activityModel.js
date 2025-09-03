const mongoose = require('mongoose');
const { generateSlug } = require('../middleware/slugMiddleware');

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
    slug: {
      type: String,
      unique: true,
    },

    // To associate many products with an activity:
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true, collection: 'activities' }
);

activitySchema.pre('save', generateSlug); // Before saving an Activity to MongoDB, run the generateSlug function.

module.exports = mongoose.model('Activity', activitySchema);
