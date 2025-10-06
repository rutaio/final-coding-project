require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const Activity = require('../models/activityModel.js');

const MONGO_URI = process.env.MONGO_URI;

// map: my activities with related wiki articles
const wikiMap = {
  'thinking-on-purpose': 'Reflective_practice',
  'doing-nothing': 'Niksen',
  'sensory-forest-walking': 'Nature_therapy',
  'home-decorating': 'Interior_design',
  'playing-with-foods': 'Cooking',
};

// new - fetch wiki paragraphs safely
async function fetchWikiParagraphs(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title
  )}`;

  // try up to 3 times in case of temporary network issues
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await axios.get(url, { timeout: 10000 });
      return response.data;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed for ${title}:`, error.message);

      if (attempt === 3) throw error;

      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }
  }
}

async function updateActivity(slug, data) {
  try {
    const activity = await Activity.findOne({ slug });

    if (!activity) {
      console.log(`No activity found with slug "${slug}"`);
      return;
    }

    // take only first paragraph for me
    const firstParagraph = (data.extract || '').split('\n')[0].trim();

    if (!firstParagraph) {
      console.log(`No text found for "${slug}"`);
      return;
    }

    // update fields
    activity.description = firstParagraph;
    activity.wiki = {
      title: data.title,
      url: data.content_urls?.desktop?.page,
      revisionID: data.revision,
    };

    await activity.save();
    console.log(`Updated activity: ${slug}`);
  } catch (error) {
    console.error(`Error updating "${slug}":`, error.message);
  }
}

// My main script here:
async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connnected to MongoDB');

    for (const [slug, title] of Object.entries(wikiMap)) {
      try {
        const data = await fetchWikiParagraphs(title);
        await updateActivity(slug, data);
      } catch (error) {
        console.error(`Failed to update "${slug}":`, error.message);
      }
    }
    console.log('All done!');
  } catch (error) {
    console.error('Connection or script error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB);');
  }
}

run();
