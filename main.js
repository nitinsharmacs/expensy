const createApp = require('./src/app');

const main = () => {
  const app = createApp();

  const PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => {
    console.info('Application is running on port', PORT);
  });
};

main();
