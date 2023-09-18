const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: String,
      required: false,
    },
    sizes: [
      {
        size: {
          type: String,
          required: true,
        },
        isSelected: {
          type: Boolean,
          required: false,
          default: false, // By default, size is not selected
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
