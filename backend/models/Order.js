const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  manufacturerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  distributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pharmaId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
