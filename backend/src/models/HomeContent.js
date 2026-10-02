const mongoose = require('mongoose');

const homeContentSchema = new mongoose.Schema({
  // Brand Intro Section
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
  imageLocation: { type: String, default: "Dildarnagar, Uttar Pradesh" },

  // Talent Hunt Banner
  talentBadge: { type: String, default: "Season 2026 Live Auditions" },
  talentHeading: { type: String, default: "YOUR STAGE" },
  talentHeadingHighlight: { type: String, default: "AWAITS." },
  talentSubheading: { type: String, default: "India's first AI-integrated talent hunt. Sing, act, or dance. Get scored by RRE AI and feature in our upcoming productions." },
  talentButtonText: { type: String, default: "Enter Audition →" },

  // AI Features Section
  aiSectionCategory: { type: String, default: "NEXT-GEN TECHNOLOGY" },
  aiSectionTitle: { type: String, default: "AI-POWERED EXPERIENCES." },
  aiSectionDesc: { type: String, default: "We're redefining the media industry with AI — from instant face match search in galleries to automated audition pitch scoring." },
  aiFeature1Title: { type: String, default: "AI Face Match Search" },
  aiFeature1Desc: { type: String, default: "Upload a selfie inside any gallery album to instantly isolate all event photos containing your face using deep feature embeddings." },
  aiFeature2Title: { type: String, default: "AI Talent Audition Scoring" },
  aiFeature2Desc: { type: String, default: "Automated audio and visual evaluation evaluating pitch stability, expression dynamics, and confidence metrics for artists." },

  // Final CTA Section
  ctaBadge: { type: String, default: "Start a Project" },
  ctaHeading: { type: String, default: "LET'S CREATE" },
  ctaHeadingItalic: { type: String, default: "THE FUTURE." },
  ctaSubheading: { type: String, default: "Ready to capture your special event or record your next hit track? Get in touch with our team today." },
  ctaButtonText: { type: String, default: "Work With Us" },
});

module.exports = mongoose.model('HomeContent', homeContentSchema);
