const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Publicly visible products on Collection page:
router.get('/public', productsController.getPublicProducts);

// Current user’s products:
router.get('/my', authMiddleware, productsController.getMyProducts);

// Admin sees all products in a Profile tab (as a table):
router.get('/admin', authMiddleware, productsController.getAllProducts);

// Publicly visible product by id for each product (?):
router.get('/:id', productsController.getProductById);
router.post('/', authMiddleware, productsController.createProduct);

// Admin approves all submitted products before they show up to the public:
router.patch('/:id/approve', authMiddleware, productsController.approveProduct);

// tbc:
// router.patch('/:id', productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);

module.exports = router;
