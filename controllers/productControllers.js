const Product = require("../models/Product.js");
module.exports = {
  createProduct: async (req, res) => {
    // Corrected order of parameters
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json("Product created");
    } catch (error) {
      res.status(500).json("Something Error happened..");
    }
  },
  getAllProducts: async (req, res) => {
    // Corrected order of parameters
    try {
      const products = await Product.find().sort({ createdAt: -1 });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("Something Error happened..");
    }
  },

  getProduct: async (req, res) => {
    // Corrected order of parameters
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
      const { __v, createdAt, ...productData } = product._doc;
      res.status(200).json(productData);
    } catch (error) {
      res.status(500).json("Something Error happened..");
    }
  },
  searchProduct: async (req, res) => {
    // Corrected order of parameters
    try {
      const result = await Product.aggregate([
        {
          $search: {
            index: "tshirts",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Something Error happened..");
    }
  },
};
