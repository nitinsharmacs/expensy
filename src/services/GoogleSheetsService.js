const GoogleSheetsClient = require('../GoogleSheetsClient');

class GoogleSheetsService {
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
  }

  async insert(values) {
    console.info('Inserting values into spreadsheet');

    const client = await GoogleSheetsClient.getClient();

    if (client === null) {
      return console.warn('Google sheets client is not present');
    }

    await client.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });
  }
}

module.exports = GoogleSheetsService;
