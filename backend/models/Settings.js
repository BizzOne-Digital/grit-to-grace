const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  group: { type: String, default: 'general' } // general, hero, about, contact, social
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
