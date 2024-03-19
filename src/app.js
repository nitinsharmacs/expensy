const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const CashflowRouter = require('./routes/Cashflow');
const CashflowController = require('./controllers/Cashflow');
const CashflowService = require('./services/CashflowService');
const GoogleSheetsService = require('./services/GoogleSheetsService');
const GoogleSheetsClient = require('./GoogleSheetsClient.js');
const AuthRouter = require('./routes/Auth');
const AuthController = require('./controllers/Auth');
const AuthService = require('./services/AuthService');
const authInterceptor = require('./services/authInterceptor');

const createApp = async ({
  spreadsheetId,
  sheetId,
  credentials,
  sessionConfig,
  sessionStore,
}) => {
  const app = express();

  app.use(
    session({
      store: sessionStore,
      secret: sessionConfig.secret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true, maxAge: 2147483647 },
    })
  );

  app.use(morgan('tiny'));

  app.use(bodyParser.json());

  await GoogleSheetsClient.create('secrets/cred.json');

  app.get('/ping', (req, res) => {
    res.send('PONG');
  });

  app.use(
    '/api/auth',
    AuthRouter(new AuthController(new AuthService(credentials)))
  );

  app.use(
    '/api',
    authInterceptor,
    CashflowRouter(
      new CashflowController(
        new CashflowService(new GoogleSheetsService(spreadsheetId, sheetId))
      )
    )
  );

  app.use('/', express.static('public'));
  return app;
};

module.exports = createApp;
