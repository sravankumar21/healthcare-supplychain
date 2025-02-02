const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');

// View production
router.get('/production', manufacturerController.viewProduction);

// Process orders
router.put('/orders/:id', manufacturerController.processOrder);

// Track inventory
router.get('/inventory', manufacturerController.trackInventory);

// Manage production
router.put('/production/:id', manufacturerController.manageProduction);

module.exports = router;
