const Testimonial = require('../models/Testimonial');

// GET  /api/testimonials  – fetch all approved testimonials (newest last)
exports.getTestimonials = async (req, res) => {
  try {
    const list = await Testimonial.find({ approved: true }).sort({ createdAt: 1 });
    return res.status(200).json({ success: true, testimonials: list });
  } catch (err) {
    console.error('getTestimonials error:', err);
    return res.status(500).json({ success: false, error: 'Could not fetch testimonials.' });
  }
};

// POST /api/testimonials  – submit a new testimonial
exports.submitTestimonial = async (req, res) => {
  try {
    const { name, role, company, text } = req.body;

    // Basic validation
    if (!name || !name.trim()) return res.status(400).json({ success: false, error: 'Name is required.' });
    if (!role || !role.trim()) return res.status(400).json({ success: false, error: 'Role is required.' });
    if (!text || !text.trim()) return res.status(400).json({ success: false, error: 'Review text is required.' });
    if (text.trim().length < 20)  return res.status(400).json({ success: false, error: 'Review must be at least 20 characters.' });

    const doc = await Testimonial.create({
      name: name.trim(),
      role: role.trim(),
      company: company ? company.trim() : '',
      text: text.trim(),
    });

    return res.status(201).json({ success: true, testimonial: doc });
  } catch (err) {
    console.error('submitTestimonial error:', err);
    return res.status(500).json({ success: false, error: 'Could not save testimonial.' });
  }
};
