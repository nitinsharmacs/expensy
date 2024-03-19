const { default: RedisStore } = require('connect-redis');
const redis = require('redis');

const createApp = require('./src/app');

const main = async () => {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const sheetId = process.env.SHEET_ID;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const secret = process.env.SESSION_SECRET;
  const redisUrl = process.env.REDIS_URL;

  const redisClient = redis.createClient({ url: redisUrl });

  redisClient
    .on('error', () => console.log('redis client not connected'))
    .on('connect', () => console.log('redis client connected'))
    .connect();

  const sessionStore = new RedisStore({ client: redisClient });

  const app = await createApp({
    sheetId,
    spreadsheetId,
    credentials: { username, password },
    sessionConfig: { secret },
    sessionStore,
  });

  const PORT = 3000 || process.env.PORT;
  app.listen(PORT, () => {
    console.info('Application is running on port', PORT);
  });
};

main();
