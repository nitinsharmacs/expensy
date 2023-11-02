const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const CashflowRouter = require('./routes/Cashflow');
const CashflowController = require('./controllers/Cashflow');
const CashflowService = require('./services/CashflowService');
const GoogleSheetsService = require('./services/GoogleSheetsService');
const GoogleSheetsClient = require('./GoogleSheetsClient.js');

const createApp = async () => {
  const app = express();

  app.use(morgan('tiny'));

  app.use(bodyParser.json());

  await GoogleSheetsClient.create('secrets/cred.json');

  app.use(
    CashflowRouter(
      new CashflowController(
        new CashflowService(
          new GoogleSheetsService(
            '1NeoSls-2bIA8G-AC7F0vchw1GMXVc2G9aKHEMHJqz-o'
          )
        )
      )
    )
  );

  return app;
};

module.exports = createApp;
