const express = require('express');
const router = express.Router();
const AboutContent = require('../models/AboutContent');

router.get('/', async (req, res) => {
  try {
    let content = await AboutContent.findOne();
    if (!content) content = await AboutContent.create({});
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let content = await AboutContent.findOne();
    if (!content) content = new AboutContent();
    Object.assign(content, req.body);
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
