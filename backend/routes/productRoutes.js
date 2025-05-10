const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', authMiddleware, productsController.createProduct);

// tbc:
// router.patch('/:id', productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);

module.exports = router;
