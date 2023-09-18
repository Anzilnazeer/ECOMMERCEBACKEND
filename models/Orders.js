const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    useId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
