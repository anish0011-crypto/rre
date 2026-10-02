const mongoose = require('mongoose');

const homeContentSchema = new mongoose.Schema({
  badgeText: { type: String, default: "Boutique Media & AI Production" },
  heading1: { type: String, default: "LET'S MAKE YOUR" },
  heading2: { type: String, default: "MOMENTS EXTRAORDINARY." },
  subheading: { type: String, default: "We don't just create events, we create memories. ✨" },
  stat1Number: { type: String, default: "12k+" },
  stat1Label: { type: String, default: "Captured Moments" },
  stat2Number: { type: String, default: "500+" },
  stat2Label: { type: String, default: "Trusted Clients" },
  image: { type: String, default: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=80" },
  imageBadge: { type: String, default: "Studio A-1 Facilities" },
  imageLocation: { type: String, default: "Dildarnagar, Uttar Pradesh" }
});

module.exports = mongoose.model('HomeContent', homeContentSchema);
