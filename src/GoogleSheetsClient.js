const { google } = require('googleapis');

class GoogleSheetsClient {
  static client;

  static async create(keyFile) {
    console.info('Creating google spreadsheet client');

    const auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();

    GoogleSheetsClient.client = google.sheets({ version: 'v4', auth: client });

    console.info('Google spreadsheet client is created');
  }
  static getClient() {
    return GoogleSheetsClient.client;
  }
}

module.exports = GoogleSheetsClient;
