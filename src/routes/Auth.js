const express = require('express');

const AuthRouter = (authController) => {
  const authRoutes = express.Router();

  authRoutes.post('/login', authController.login);

  return authRoutes;
};

module.exports = AuthRouter;
