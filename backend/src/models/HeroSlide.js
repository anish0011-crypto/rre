const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  order: { type: Number, default: 0 },
  image: { type: String, required: true }, // base64 or URL
  title: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
