const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 80 },
  role:      { type: String, required: true, trim: true, maxlength: 120 },
  company:   { type: String, trim: true, maxlength: 100, default: '' },
  text:      { type: String, required: true, trim: true, maxlength: 600 },
  approved:  { type: Boolean, default: true },   // auto-approve for portfolio use
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
