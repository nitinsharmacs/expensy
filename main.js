const createApp = require('./src/app');

const main = async () => {
  const sheetId = process.env.SHEET_ID;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  const app = await createApp({ sheetId, credentials: { username, password } });

  const PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => {
    console.info('Application is running on port', PORT);
  });
};

main();
