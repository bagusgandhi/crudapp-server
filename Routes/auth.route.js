const express = require('express');
const authController = require('../Controllers/auth.controller');
const userController = require('../Controllers/user.controller');

const router = express.Router();

router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

router
  .route('/')
  .get(authController.protect, userController.getProfile)

module.exports = router;
