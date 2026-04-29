const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  courseName: String,
  price: Number,
  name: String,
  email: String,
  selectedBatch: String,
  source: { type: String, default: 'whatsapp' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
