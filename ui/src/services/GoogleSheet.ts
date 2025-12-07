/* eslint-disable @typescript-eslint/ban-ts-comment */

import type GoogleClient from '@/models/GoogleClient';
import { Category } from '@/screens/NewEntry/NewEntry.types';

class GoogleSheet {
  private googleClient: GoogleClient;
  private spreadsheetId: string;
  private static LIMIT: number = 10;

  constructor(client: GoogleClient) {
    this.googleClient = client;
    this.spreadsheetId = '';
  }

  async setup(spreadsheetId: string) {
    await this.googleClient.setup();
    this.spreadsheetId = spreadsheetId;
  }

  async getCategories(): Promise<
    gapi.client.HttpRequestFulfilled<{ values: Category[]; error: any }>
  > {
    // @ts-ignore
    const client = this.googleClient.client.sheets;

    return await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Expense Division!A2:A',
    });
  }

  async insert(
    entries: any[][]
  ): Promise<gapi.client.HttpRequestFulfilled<void>> {
    console.info('Inserting values into spreadsheet');

    // @ts-ignore
    const client = this.googleClient.client.sheets;

    const result = await client.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Daily Expenses!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: entries,
      },
    });

    return result;
  }

  async getMetaInformation() {
    console.info('Getting meta information');

    // @ts-ignore
    const client = this.googleClient.client.sheets;

    const response = await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `metadata!A:B`,
    });

    return response.result.values.reduce((meta: any, value: any) => {
      meta[value[0]] = value[1];
      return meta;
    }, {});
  }

  async getRecentEntries(): Promise<
    gapi.client.HttpRequestFulfilled<{
      values: any[];
      error: any;
    }>
  > {
    // @ts-ignore
    const client = this.googleClient.client.sheets;

    const { total } = await this.getMetaInformation();

    const startIndex = total - GoogleSheet.LIMIT;
    const endIndex = total;

    return await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `Daily Expenses!A${startIndex}:E${endIndex}`,
    });
  }

  async getMonthlyExpenses(): Promise<
    gapi.client.HttpRequestFulfilled<{
      values: any[];
      error: any;
    }>
  > {
    console.info('Fetching monthly expenses from spreadsheet');

    // @ts-ignore
    const client = this.googleClient.client.sheets;

    return await client.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `Monthly Expenses!A1:J13`,
    });
  }

  async deleteEntries(entryIDs: number[]): Promise<
    gapi.client.HttpRequestFulfilled<{
      values: any[];
      error: any;
    }>
  > {
    console.info('Start Delete Entries');

    // @ts-ignore
    const client = this.googleClient.client.sheets;

    const startIndex = entryIDs[0] - 1;
    const endIndex = entryIDs[0];

    const resource = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 0,
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

    return await client.spreadsheets.batchUpdate(batchReqBody);
  }
}

export default GoogleSheet;
