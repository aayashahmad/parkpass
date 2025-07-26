const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  ticket_code: String,
  status: { type: String, enum: ['valid', 'used'], default: 'valid' }
});

module.exports = mongoose.model('Ticket', ticketSchema);
