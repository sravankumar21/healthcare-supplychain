const express = require('express');
const router = express.Router();
const pharmaController = require('../controllers/pharmaController');

// Place Orders Routes
router.post('/orders', pharmaController.placeOrder);

// Track Orders Routes
router.get('/track', pharmaController.trackOrder);

// View Order History Routes
router.get('/history', pharmaController.viewOrderHistory);

module.exports = router;
