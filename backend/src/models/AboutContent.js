const mongoose = require('mongoose');

const aboutContentSchema = new mongoose.Schema({
  // Hero Section
  heroOverline: { type: String, default: "Our Story & Philosophy" },
  heroHeading1: { type: String, default: "WE CREATE" },
  heroHeading2: { type: String, default: "STORIES THAT" },
  heroHeading3: { type: String, default: "STAY." },
  heroSubheading: { type: String, default: "Rajat Raj Entertainment is a creative house dedicated to cinematic excellence across photography, film, sound, and live media production." },
  heroBgImage: { type: String, default: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85" },

  // Philosophy Section
  philosophyOverline: { type: String, default: "The Studio" },
  philosophyHeading1: { type: String, default: "DRIVEN BY" },
  philosophyHeading2: { type: String, default: "HUMAN EMOTION." },
  philosophyBody: { type: String, default: "Founded with a conviction that artistry and innovation must work as one, RRE unites world-class creative talent with modern production tools. We solve technical barriers so that artists and clients can focus entirely on genuine expression." },
  philosophyImage: { type: String, default: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&q=80" },
  missionTitle: { type: String, default: "Our Mission" },
  missionDesc: { type: String, default: "To empower every client and creator with uncompromising production quality and storytelling." },
  visionTitle: { type: String, default: "Our Vision" },
  visionDesc: { type: String, default: "To set the benchmark for AI-integrated creative media across photography, cinema, and audio." },

  // Core Values
  value1Title: { type: String, default: "Excellence" },
  value1Desc: { type: String, default: "We don't settle for 'good enough'. Every frame, mix, and capture is refined to perfection." },
  value2Title: { type: String, default: "Integrity" },
  value2Desc: { type: String, default: "Transparent workflows, dependable timelines, and unwavering commitment to client trust." },
  value3Title: { type: String, default: "Innovation" },
  value3Desc: { type: String, default: "Constantly advancing our production pipeline with state-of-the-art cinematic tools and AI indexing." },

  // Contact Info
  phone: { type: String, default: "+91 88981 34049" },
  email: { type: String, default: "rajatrajentertainment@gmail.com" },
  instagram: { type: String, default: "@kundan_rajat_raj" },
  instagramUrl: { type: String, default: "https://www.instagram.com/kundan_rajat_raj" },
  location: { type: String, default: "Dildarnagar — 232326" },

  // CTA Section
  ctaHeading1: { type: String, default: "JOIN THE" },
  ctaHeading2: { type: String, default: "RRE EXPERIENCE." },
  ctaSubheading: { type: String, default: "Whether you are planning a landmark event or an artist ready to showcase your talent, we bring your vision to life." },
  ctaBtn1Text: { type: String, default: "Start a Project" },
  ctaBtn2Text: { type: String, default: "Join Talent Hunt" },
});

module.exports = mongoose.model('AboutContent', aboutContentSchema);
