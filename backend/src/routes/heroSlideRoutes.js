const express = require('express');
const router = express.Router();
const HeroSlide = require('../models/HeroSlide');

// Default fallback slides (used when DB is empty)
const defaultSlides = [
  {
    order: 0,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=85',
    title: 'Grand Wedding & Event Production',
    isActive: true
  },
  {
    order: 1,
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85',
    title: 'Cinematic Films & Visual Arts',
    isActive: true
  },
  {
    order: 2,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=85',
    title: 'Studio Recording & Music',
    isActive: true
  },
  {
    order: 3,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=85',
    title: 'Live Concert & Broadcast',
    isActive: true
  }
];

// GET all active slides (for Hero frontend)
router.get('/', async (req, res) => {
  try {
    let slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    if (slides.length === 0) {
      // Seed defaults on first run
      await HeroSlide.insertMany(defaultSlides);
      slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    }
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all slides including inactive (for Admin)
router.get('/all', async (req, res) => {
  try {
    let slides = await HeroSlide.find().sort({ order: 1 });
    if (slides.length === 0) {
      await HeroSlide.insertMany(defaultSlides);
      slides = await HeroSlide.find().sort({ order: 1 });
    }
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new slide
router.post('/', async (req, res) => {
  try {
    const { image, title, order, isActive } = req.body;
    if (!image) return res.status(400).json({ message: 'Image is required' });

    const count = await HeroSlide.countDocuments();
    const slide = new HeroSlide({
      image,
      title: title || '',
      order: order !== undefined ? order : count,
      isActive: isActive !== undefined ? isActive : true
    });
    const saved = await slide.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update slide (toggle active, reorder, change image/title)
router.put('/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json(slide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE slide
router.delete('/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Slide not found' });
    res.json({ success: true, message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT reorder all slides at once
router.put('/reorder/bulk', async (req, res) => {
  try {
    const { slides } = req.body; // [{_id, order}]
    const updates = slides.map(s =>
      HeroSlide.findByIdAndUpdate(s._id, { order: s.order }, { new: true })
    );
    await Promise.all(updates);
    const updated = await HeroSlide.find().sort({ order: 1 });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
