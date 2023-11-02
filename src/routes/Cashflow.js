const express = require('express');

const CashflowRouter = (cashflowController) => {
  const cashflowRoutes = express.Router();

  cashflowRoutes.get('/read', cashflowController.read);

  cashflowRoutes.post('/entry', cashflowController.newEntry);

  return cashflowRoutes;
};

module.exports = CashflowRouter;
