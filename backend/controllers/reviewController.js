const Review = require('../models/Review');

/**
 * GET /api/reviews
 * Returns all reviews sorted newest first.
 */
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .select('-email -__v') // never expose emails publicly
      .lean();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error('[ReviewController] getReviews error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews. Please try again.',
    });
  }
};

/**
 * POST /api/reviews
 * Validates, saves, and returns the new review.
 * Validation is handled upstream by validateReview middleware.
 */
const createReview = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    const review = await Review.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rating: parseInt(rating, 10),
      message: message.trim(),
    });

    // Return the public-safe version (omit email)
    const publicReview = {
      _id: review._id,
      name: review.name,
      rating: review.rating,
      message: review.message,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };

    res.status(201).json({
      success: true,
      data: publicReview,
    });
  } catch (err) {
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(422).json({ success: false, errors });
    }

    console.error('[ReviewController] createReview error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to submit review. Please try again.',
    });
  }
};

module.exports = { getReviews, createReview };
