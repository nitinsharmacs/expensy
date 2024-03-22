const express = require('express');

const CashflowRouter = (cashflowController) => {
  const cashflowRoutes = express.Router();

  cashflowRoutes.get('/read', cashflowController.read);

  cashflowRoutes.post('/entry', cashflowController.newEntry);

  cashflowRoutes.post('/entries', cashflowController.insertEntries);

  cashflowRoutes.get('/categories', cashflowController.getCategories);

  cashflowRoutes.get('/recent-entries', cashflowController.getRecentEntries);

  cashflowRoutes.get(
    '/monthly-expenses',
    cashflowController.getMonthlyExpenses
  );

  cashflowRoutes.delete('/delete-entries', cashflowController.deleteEntries);

  return cashflowRoutes;
};

module.exports = CashflowRouter;
