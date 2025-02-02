// In controllers/manufacturerController.js

const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Function to view production
exports.viewProduction = async (req, res) => {
  try {
    const production = await Product.find();
    res.status(200).json(production);
  } catch (err) {
    res.status(400).json({ message: 'Error retrieving production data', error: err.message });
  }
};

// Function to fetch all dealers (users with role 'distributor')
exports.fetchDealers = async (req, res) => {
  try {
    // Fetch all users with the 'distributor' role
    const dealers = await User.find({ role: 'distributor' });

    if (dealers.length > 0) {
      res.status(200).json(dealers);
    } else {
      res.status(404).json({ message: 'No dealers found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Error fetching dealers', error: err.message });
  }
}; 
// Function to process an order
exports.processOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    // Logic for processing the order
    res.status(200).json({ message: 'Order processed successfully', order });
  } catch (err) {
    res.status(400).json({ message: 'Error processing order', error: err.message });
  }
};

// Function to track inventory
exports.trackInventory = async (req, res) => {
  try {
    const inventory = await Product.find();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).json({ message: 'Error tracking inventory', error: err.message });
  }
};

// Function to manage production
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

// Function to add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, quantityAvailable } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      quantityAvailable
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};

// Order placement API in manufacturerController.js
exports.placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Fetch product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ success: false, message: 'Product not found' });
    }

    // Check if enough stock is available
    if (product.quantityAvailable < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough stock available' });
    }

    // Update the product's inventory
    product.quantityAvailable -= quantity;
    await product.save();

    // Record the order (you might need to store it in an 'orders' collection or perform other actions)

    return res.status(200).json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
