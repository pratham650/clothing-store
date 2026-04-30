const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      priceAtPurchase: Number
    }
  ],
  totalAmount: Number,
  shippingAddress: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    paymentMethod: String,
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", orderSchema);
