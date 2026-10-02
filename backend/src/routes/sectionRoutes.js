const express = require('express');
const router = express.Router();
const Section = require('../models/Section');

// Seed default initial sections for Home and About pages
const seedDefaultSections = async () => {
  const count = await Section.countDocuments();
  if (count > 0) return;

  const defaultSections = [
    {
      sectionKey: 'home_brand_intro',
      page: 'home',
      title: "LET'S MAKE YOUR MOMENTS EXTRAORDINARY.",
      subtitle: "We don't just create events, we create memories. ✨",
      badge: "Boutique Media & AI Production",
      content: "RRE unites world-class creative talent with modern production tools. We solve technical barriers so that artists and clients can focus entirely on genuine expression.",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&q=80",
      layout: 'split_right',
      theme: 'dark',
      order: 1,
      isActive: true,
      isDeletable: true,
      buttons: [
        { text: 'Explore Services', link: '/services', variant: 'primary', isActive: true },
        { text: 'Book Session', link: '/booking', variant: 'outline', isActive: true }
      ],
      items: [
        { number: '12k+', label: 'Captured Moments', isActive: true },
        { number: '500+', label: 'Trusted Clients', isActive: true }
      ]
    },
    {
      sectionKey: 'home_talent_banner',
      page: 'home',
      title: "YOUR STAGE AWAITS.",
      subtitle: "India's first AI-integrated talent hunt. Sing, act, or dance. Get scored by RRE AI and feature in our upcoming productions.",
      badge: "Season 2026 Live Auditions",
      layout: 'banner',
      theme: 'glass',
      order: 2,
      isActive: true,
      isDeletable: true,
      buttons: [
        { text: 'Enter Audition →', link: '/talent-hunt', variant: 'primary', isActive: true }
      ]
    },
    {
      sectionKey: 'home_ai_features',
      page: 'home',
      title: "AI-POWERED EXPERIENCES.",
      subtitle: "We're redefining the media industry with AI — from instant face match search in galleries to automated audition pitch scoring.",
      badge: "NEXT-GEN TECHNOLOGY",
      layout: 'features',
      theme: 'dark',
      order: 3,
      isActive: true,
      isDeletable: true,
      buttons: [
        { text: 'Launch AI Hub', link: '/ai-hub', variant: 'accent', isActive: true }
      ],
      items: [
        {
          title: "AI Face Match Search",
          description: "Upload a selfie inside any gallery album to instantly isolate all event photos containing your face using deep feature embeddings.",
          icon: "Sparkles",
          isActive: true
        },
        {
          title: "AI Talent Audition Scoring",
          description: "Automated audio and visual evaluation evaluating pitch stability, expression dynamics, and confidence metrics for artists.",
          icon: "Trophy",
          isActive: true
        }
      ]
    },
    {
      sectionKey: 'home_cta',
      page: 'home',
      title: "LET'S CREATE THE FUTURE.",
      subtitle: "Ready to capture your special event or record your next hit track? Get in touch with our team today.",
      badge: "Start a Project",
      layout: 'centered_cta',
      theme: 'glass',
      order: 4,
      isActive: true,
      isDeletable: true,
      buttons: [
        { text: 'Work With Us', link: '/booking', variant: 'primary', isActive: true },
        { text: 'Contact Us', link: '/about', variant: 'secondary', isActive: true }
      ]
    },
    {
      sectionKey: 'about_hero',
      page: 'about',
      title: "WE CREATE STORIES THAT STAY.",
      subtitle: "Rajat Raj Entertainment is a creative house dedicated to cinematic excellence across photography, film, sound, and live media production.",
      badge: "Our Story & Philosophy",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85",
      layout: 'banner',
      theme: 'dark',
      order: 1,
      isActive: true,
      isDeletable: true,
      buttons: [
        { text: 'View Portfolio', link: '/portfolio', variant: 'primary', isActive: true }
      ]
    },
    {
      sectionKey: 'about_philosophy',
      page: 'about',
      title: "DRIVEN BY HUMAN EMOTION.",
      subtitle: "Founded with a conviction that artistry and innovation must work as one, RRE unites world-class creative talent with modern production tools.",
      badge: "The Studio",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&q=80",
      layout: 'split_right',
      theme: 'glass',
      order: 2,
      isActive: true,
      isDeletable: true,
      buttons: [
        { text: 'Our Services', link: '/services', variant: 'outline', isActive: true }
      ],
      items: [
        { title: 'Our Mission', description: 'To empower every client and creator with uncompromising production quality and storytelling.', isActive: true },
        { title: 'Our Vision', description: 'To set the benchmark for AI-integrated creative media across photography, cinema, and audio.', isActive: true }
      ]
    }
  ];

  await Section.insertMany(defaultSections);
  console.log('✅ Default sections seeded successfully');
};

// GET all sections (with optional filtering)
router.get('/', async (req, res) => {
  try {
    await seedDefaultSections();

    const { page, includeInactive } = req.query;
    const filter = {};

    if (page && page !== 'all') {
      filter.page = { $in: [page, 'all'] };
    }

    if (includeInactive !== 'true') {
      filter.isActive = true;
    }

    const sections = await Section.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single section by ID
router.get('/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new section
router.post('/', async (req, res) => {
  try {
    const newSection = new Section(req.body);
    const saved = await newSection.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update existing section
router.put('/:id', async (req, res) => {
  try {
    const updated = await Section.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Section not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE section
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Section.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Section not found' });
    res.json({ message: 'Section deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST trigger manual seed
router.post('/seed-defaults', async (req, res) => {
  try {
    await Section.deleteMany({ isDeletable: true });
    await seedDefaultSections();
    const sections = await Section.find().sort({ order: 1 });
    res.json({ message: 'Sections re-seeded with defaults', sections });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
