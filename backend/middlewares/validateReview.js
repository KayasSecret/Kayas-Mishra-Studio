/**
 * Express middleware: validates review submission fields.
 * Returns a 422 with a field-level `errors` map on failure.
 */
const validateReview = (req, res, next) => {
  const { name, email, rating, message } = req.body;
  const errors = {};

  // ── Name ──────────────────────────────────
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.name = 'Full name is required.';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters.';
  } else if (name.trim().length > 40) {
    errors.name = 'Name must not exceed 40 characters.';
  }

  // ── Email ─────────────────────────────────
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // ── Rating ────────────────────────────────
  const parsedRating = parseInt(rating, 10);
  if (!rating && rating !== 0) {
    errors.rating = 'Please select a rating.';
  } else if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    errors.rating = 'Rating must be between 1 and 5.';
  }

  // ── Message ───────────────────────────────
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.message = 'Review message is required.';
  } else if (message.trim().length < 15) {
    errors.message = 'Review must be at least 15 characters.';
  } else if (message.trim().length > 500) {
    errors.message = 'Review must not exceed 500 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  next();
};

module.exports = { validateReview };
