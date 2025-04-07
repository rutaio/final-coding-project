const Product = require('../models/productModel');

const getProducts = (req, res) => {
  res.json(Product.getProducts());
};

const getProductById = (req, res) => {
    const productId = req.params.id;
    const product = Product.getProductById(productId);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res.json(product);
  };

module.exports = {
  getProducts,
  getProductById,
};