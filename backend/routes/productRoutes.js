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

// NEW - products will use slugs from now on:
router.get('/slug/:slug', productsController.getProductBySlug); // this allows to visit a product directly via slug 

// Previously set products by id (useful to have for admins):
router.get('/:id', productsController.getProductById);

router.post('/', authMiddleware, productsController.createProduct);

// Admin must approve or reject all submitted products before they show up to the public;
// Admin also can update user products inputs for clarity:
router.patch('/:id', authMiddleware, productsController.updateProduct);

router.delete('/:id', authMiddleware, productsController.deleteProduct);

module.exports = router;
