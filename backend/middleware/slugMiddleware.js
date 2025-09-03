const slugify = require('slugify');

const generateSlug = function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true, // remove special characters like #, &, !, etc.
      locale: 'en', // for my international submissions :)
    });
  }
  next();
};

module.exports = { generateSlug };
