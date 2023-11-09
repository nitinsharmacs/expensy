const express = require('express');

const CashflowRouter = (cashflowController) => {
  const cashflowRoutes = express.Router();

  cashflowRoutes.get('/read', cashflowController.read);

  cashflowRoutes.post('/entry', cashflowController.newEntry);

  cashflowRoutes.get('/categories', cashflowController.getCategories);

  return cashflowRoutes;
};

module.exports = CashflowRouter;
