const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importing CORS middleware

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const manufacturerRoutes = require('./routes/manufacturer');
const distributorRoutes = require('./routes/distributor');
const pharmaRoutes = require('./routes/pharma');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => console.log('MongoDB connection error: ', err));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/distributor', distributorRoutes);
app.use('/api/pharma', pharmaRoutes);

// Error Handling Middleware (optional, for better error handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
