const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park' },
  adults: Number,
  children: Number,
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
