const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
  name: String,
  district: String,
  location: String,
  description: String,
  rate_adult: Number,
  rate_child: Number,
  image: String, // ✅ this must exist
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

module.exports = mongoose.model('Park', parkSchema);
