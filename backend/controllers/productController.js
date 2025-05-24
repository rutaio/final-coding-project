const Product = require('../models/productModel');

exports.getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find({ approved: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// For logged-in user (product submissions):
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ submittedBy: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your submissions' });
  }
};

// For admin (all products):
exports.getAllProducts = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const products = await Product.find(); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all products' });
  }
};

// works on postman
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// does not work on postman
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// update and delete - by admin - tbc
