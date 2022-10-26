const express = require('express');
const productController = require('../Controllers/product.controller');
const authController = require('../Controllers/auth.controller');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, productController.getAllProduct)
  .post(authController.protect, productController.addNewProduct);

router
  .route('/:product_id')
  .get(authController.protect, productController.productById)
  .patch(authController.protect, productController.updateProduct)
  .delete(authController.protect, productController.deleteProduct);

module.exports = router;