const GoogleSheetsClient = require('../GoogleSheetsClient');

class GoogleSheetsService {
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
  }

  async insert(values) {
    console.info('Inserting values into spreadsheet');

    const client = await GoogleSheetsClient.getClient();

    await client.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Daily Expenses!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });
  }

  async getCategories() {
    console.info('Fetching categories from spreadsheet');

    const client = await GoogleSheetsClient.getClient();

    const response = await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Expense Division!A2:A',
    });

    return response.data.values;
  }
}

module.exports = GoogleSheetsService;
