const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productController');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);

// tbc:
// router.patch('/:id', productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);

module.exports = router;
