const express = require('express');
const router = express.Router();
const HomeContent = require('../models/HomeContent');

// Get content (create default if not exists)
router.get('/', async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      content = await HomeContent.create({});
    }
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update content
router.put('/', async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (!content) {
      content = new HomeContent();
    }
    
    // Update fields
    const fields = ['badgeText', 'heading1', 'heading2', 'subheading', 'stat1Number', 'stat1Label', 'stat2Number', 'stat2Label', 'image', 'imageBadge', 'imageLocation'];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        content[field] = req.body[field];
      }
    });

    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
