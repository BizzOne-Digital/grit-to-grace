const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  icon: { type: String, default: 'User' }, // lucide-react icon name
  title: { type: String, required: true },
  desc: { type: String, required: true },
  details: { type: String, default: '' },
  audience: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
