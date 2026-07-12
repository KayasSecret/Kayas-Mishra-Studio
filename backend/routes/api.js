const express = require('express');
const router = express.Router();
const contactController     = require('../controllers/contactController');
const chatController        = require('../controllers/chatController');
const testimonialController = require('../controllers/testimonialController');
const reviewController      = require('../controllers/reviewController');
const { validateReview }    = require('../middlewares/validateReview');

// Contact route
router.post('/contact', contactController.submitContact);

// Chatbot route
router.post('/chat', chatController.handleChat);

// Testimonials routes
router.get('/testimonials',  testimonialController.getTestimonials);
router.post('/testimonials', testimonialController.submitTestimonial);

// Fantasy Store Reviews
router.get('/reviews',  reviewController.getReviews);
router.post('/reviews', validateReview, reviewController.createReview);

module.exports = router;
