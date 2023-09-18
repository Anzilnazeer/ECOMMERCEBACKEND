const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = {
  addCart: async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const { cartItem, quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId });
      
      if (cart) {
        const existingProduct = cart.product.find(
          (product) => product.cartItem.toString() == cartItem
        );
        console.log(existingProduct);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.product.push({ cartItem, quantity: 1 });
        }
        await cart.save();
        res.status(200).json({ message: "Added to cart" });
      } else {
        const newCart = new Cart({
          userId,
          product: [{ cartItem, quantity: 1 }],
        });
        await newCart.save();
        res.status(200).json({ message: "Added to cart" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  getCart: async (req, res) => {
    const userId = req.user.id;
    try {
      const cart = await Cart.find({ userId });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  deleteCart: async (req, res) => {
    const cartItemId = req.params.cartItem;
    try {
      const updatedCart = Cart.findOneAndUpdate(
        { "products._id": cartItemId },
        { $pull: { product: { _id: cartItemId } } },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
