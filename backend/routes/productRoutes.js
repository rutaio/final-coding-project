const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Publicly visible products:
router.get('/public', productsController.getPublicProducts);

// Current user’s products:
router.get('/my', authMiddleware, productsController.getMyProducts);

// Admin sees all products (as a table):
router.get('/admin', authMiddleware, productsController.getAllProducts);

// Publicly visible product by id for each product (?):
router.get('/:id', productsController.getProductById);
router.post('/', authMiddleware, productsController.createProduct);

// Admin must approve or reject all submitted products before they show up to the public:
router.patch('/:id/status', authMiddleware, productsController.updateProductStatus);

// tbc:
// router.delete('/:id', productsController.deleteProduct);

module.exports = router;
