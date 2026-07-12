require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'https://kayas-mishra-studio-eight.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend API is running smoothly',
    timestamp: new Date()
  });
});

// 3. API Routes
app.use('/api', apiRoutes);
app.use('/api/payment', require('./routes/paymentRoutes'));

// 4. Handle 404 errors for API endpoints
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'API Endpoint Not Found'
  });
});

// 5. Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack || err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// 6. Connect to MongoDB and start Server
const startServer = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/kayas_portfolio';
  
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.warn('Warning: Failed to connect to MongoDB. Submissions will fall back to in-memory storage.', error.message);
  }
  
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
