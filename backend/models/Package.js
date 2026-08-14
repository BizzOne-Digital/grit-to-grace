const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  frequency: { type: String, default: '/ month' },
  tagline: { type: String, default: '' },
  desc: { type: String, default: '' },
  features: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
