const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  manufacturerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantityInStock: { type: Number, required: true },
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
