const Product = require('../models/productModel');

// why postman does not show all data that is on mongo db?
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// why postman does not find product by id?
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

// works on postman
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
