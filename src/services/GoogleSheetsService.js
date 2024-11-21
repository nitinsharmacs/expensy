const GoogleSheetsClient = require('../GoogleSheetsClient');

const asc = (a, b) => b - a;
class GoogleSheetsService {
  #LIMIT;
  constructor(spreadsheetId, sheetId) {
    this.#LIMIT = 10;
    this.spreadsheetId = spreadsheetId;
    this.sheetId = sheetId;
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
      range: `Daily Expenses!A${startIndex}:E${endIndex}`,
    });

    return response.data.values;
  }

  async getMonthlyExpenses() {
    console.info('Fetching monthly expenses from spreadsheet');

    const client = await GoogleSheetsClient.getClient();

    const response = await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `Monthly Expenses!A1:J13`,
    });

    return response.data.values;
  }

  async deleteEntries(entryIDs) {
    console.info('Start Delete Entries');

    const client = await GoogleSheetsClient.getClient();

    const startIndex = entryIDs[0] - 1;
    const endIndex = entryIDs[0];

    const resource = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: this.sheetId,
              dimension: 'ROWS',
              startIndex,
              endIndex,
            },
          },
        },
      ],
    };

    const batchReqBody = {
      spreadsheetId: this.spreadsheetId,
      resource: resource,
    };

    await client.spreadsheets.batchUpdate(batchReqBody);
  }
}

module.exports = GoogleSheetsService;
