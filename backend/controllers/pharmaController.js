const Order = require('../models/Order'); // Assuming an Order model is defined

// Place Orders with Distributors
exports.placeOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(400).json({ message: 'Error placing order', error: err.message });
  }
};

// Track Order Status
exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Error tracking order', error: err.message });
  }
};

// View Order History
exports.viewOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }); // Assuming user ID is available for filtering orders
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving order history', error: err.message });
  }
};
