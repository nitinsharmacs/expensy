const createApp = require('./src/app');

const main = async () => {
  const app = await createApp();

  const PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => {
    console.info('Application is running on port', PORT);
  });
};

main();
