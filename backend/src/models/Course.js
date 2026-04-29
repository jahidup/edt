const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: String,
  batchTimings: [String],
  mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Online' },
  limitedSeats: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
