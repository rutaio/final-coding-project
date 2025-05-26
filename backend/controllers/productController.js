const Product = require('../models/productModel');

exports.getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find(); // in the future, the filder needs to be added in ({ approved: true })
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch all public products in the server' });
  }
};

// For logged-in user (product submissions):
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ submittedBy: req.user.id });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch user submissions in the server' });
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
    res
      .status(500)
      .json({ error: 'Failed to fetch all products in the server' });
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
    res
      .status(500)
      .json({ error: 'Failed to fetch a specific product in the server' });
  }
};

// does not work on postman
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      submittedBy: req.user.id,
      approved: false,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({
        error: error.message || 'Failed to create a product in the server',
      });
  }
};

// Amin only - approve user submitted products:
exports.approveProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product approved', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve product' });
  }
};

// update and delete - by admin - tbc
