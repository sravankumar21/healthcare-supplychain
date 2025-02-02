// controllers/distributorController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place Orders with Manufacturers
exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(400).json({ message: 'Error placing order', error: err.message });
  }
};

// Manage Inventory
exports.manageInventory = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Inventory updated successfully', product });
  } catch (err) {
    res.status(400).json({ message: 'Error managing inventory', error: err.message });
  }
};

// Track and Dispatch Orders to Pharma
exports.dispatchOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Dispatched' }, { new: true });
    res.status(200).json({ message: 'Order dispatched successfully', order });
  } catch (err) {
    res.status(400).json({ message: 'Error dispatching order', error: err.message });
  }
};
