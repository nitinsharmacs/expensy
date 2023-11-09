const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const CashflowRouter = require('./routes/Cashflow');
const CashflowController = require('./controllers/Cashflow');
const CashflowService = require('./services/CashflowService');
const GoogleSheetsService = require('./services/GoogleSheetsService');
const GoogleSheetsClient = require('./GoogleSheetsClient.js');
const AuthRouter = require('./routes/Auth');
const AuthController = require('./controllers/auth');
const AuthService = require('./services/AuthService');

const createApp = async ({ sheetId, credentials }) => {
  const app = express();

  app.use(morgan('tiny'));

  app.use(bodyParser.json());

  await GoogleSheetsClient.create('secrets/cred.json');

  app.use(
    '/api',
    CashflowRouter(
      new CashflowController(
        new CashflowService(new GoogleSheetsService(sheetId))
      )
    )
  );

  app.use(
    '/api/auth',
    AuthRouter(new AuthController(new AuthService(credentials)))
  );

  app.use('/', express.static('public'));
  return app;
};

module.exports = createApp;
