// controllers/manufacturerController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

// View production
exports.viewProduction = async (req, res) => {
  try {
    const production = await Product.find();
    res.status(200).json(production);
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving production data', error: err.message });
  }
};

// Process order
exports.processOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    // Logic for processing the order
    res.status(200).json({ message: 'Order processed successfully', order });
  } catch (err) {
    res.status(400).json({ message: 'Error processing order', error: err.message });
  }
};

// Track inventory
exports.trackInventory = async (req, res) => {
  try {
    const inventory = await Product.find();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).json({ message: 'Error tracking inventory', error: err.message });
  }
};

// Manage production
exports.manageProduction = async (req, res) => {
  const { id } = req.params;
  const { status, quantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { status, quantity }, { new: true });
    res.status(200).json({ message: 'Production managed successfully', product });
  } catch (err) {
    res.status(400).json({ message: 'Error managing production', error: err.message });
  }
};
