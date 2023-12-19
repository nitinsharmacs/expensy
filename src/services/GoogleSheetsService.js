const GoogleSheetsClient = require('../GoogleSheetsClient');

class GoogleSheetsService {
  #LIMIT;
  constructor(spreadsheetId) {
    this.#LIMIT = 10;
    this.spreadsheetId = spreadsheetId;
  }

  async insert(values) {
    console.info('Inserting values into spreadsheet');

    const client = await GoogleSheetsClient.getClient();

    const result = await client.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Daily Expenses!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    return result;
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

  async getMetaInformation() {
    console.info('Getting meta information');

    const client = await GoogleSheetsClient.getClient();

    const response = await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `metadata!A:B`,
    });

    return response.data.values.reduce((meta, value) => {
      meta[value[0]] = value[1];
      return meta;
    }, {});
  }

  async getRecentEntries() {
    console.info('Fetching recent entries from spreadsheet');

    const client = await GoogleSheetsClient.getClient();

    const { total } = await this.getMetaInformation();

    const startIndex = total - this.#LIMIT;
    const endIndex = total;

    const response = await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `Daily Expenses!A${startIndex}:D${endIndex}`,
    });

    return response.data.values;
  }
}

module.exports = GoogleSheetsService;
