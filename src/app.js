const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const CashflowRouter = require('./routes/Cashflow');
const CashflowController = require('./controllers/Cashflow');
const CashflowService = require('./services/CashflowService');

const createApp = () => {
  const app = express();

  app.use(morgan('tiny'));

  app.use(bodyParser.json());

  app.use(CashflowRouter(new CashflowController(new CashflowService())));

  return app;
};

module.exports = createApp;
