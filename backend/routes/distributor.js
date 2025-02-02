// routes/distributor.js
const express = require('express');
const router = express.Router();
const distributorController = require('../controllers/distributorController');

// Place Orders Routes
router.post('/orders', distributorController.placeOrder);

// Manage Inventory Routes
router.get('/inventory', distributorController.manageInventory);

// Dispatch Orders Routes - Corrected the method name to dispatchOrder (singular)
router.get('/dispatch', distributorController.dispatchOrder);

module.exports = router;
