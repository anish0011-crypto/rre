const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  text: { type: String, required: true, default: 'Learn More' },
  link: { type: String, default: '#' },
  variant: { 
    type: String, 
    enum: ['primary', 'secondary', 'outline', 'accent', 'danger', 'ghost'], 
    default: 'primary' 
  },
  icon: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { _id: true });

const itemSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  number: { type: String, default: '' },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  image: { type: String, default: '' },
  link: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { _id: true });

const sectionSchema = new mongoose.Schema({
  sectionKey: { type: String, unique: true, sparse: true }, // e.g. 'home_hero', 'home_brand_intro', 'about_philosophy'
  page: { 
    type: String, 
    required: true, 
    enum: ['home', 'about', 'services', 'all', 'custom'],
    default: 'home' 
  },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  badge: { type: String, default: '' },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  secondaryImage: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  layout: { 
    type: String, 
    enum: ['standard', 'split_right', 'split_left', 'banner', 'centered_cta', 'grid', 'features'], 
    default: 'standard' 
  },
  theme: { 
    type: String, 
    enum: ['dark', 'glass', 'light', 'accent'], 
    default: 'dark' 
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDeletable: { type: Boolean, default: true },
  buttons: [buttonSchema],
  items: [itemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Section', sectionSchema);
