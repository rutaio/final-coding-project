const Product = require('../models/productModel');

exports.getPublicProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'approved' });
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
    const products = await Product.find({ userId: req.user.id });
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
      userId: req.user.id,
      source: 'user',
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Failed to create a product in the server',
    });
  }
};

// Amin only:
exports.updateProductStatus = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { title, description, materials, status } = req.body;

  const allowedStatuses = ['approved', 'rejected', 'under-review'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Such status does not exist' });
  }

  const update = {
    title,
    description,
    materials,
    status,
  };

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: `Product ${status}`, product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// update and delete - by admin - tbc
