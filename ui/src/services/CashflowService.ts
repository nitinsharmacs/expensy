import type GoogleSheet from '@/services/GoogleSheet';
import { MonthlyExpense } from '../screens/MonthlyExpenses/Types';
import { Category, NewEntryState } from '../screens/NewEntry/NewEntry.types';

class CashflowService {
  private static _googleSheet: GoogleSheet | null;

  static setGoogleSheet(googleSheet: GoogleSheet) {
    this._googleSheet = googleSheet;
  }

  static get googleSheet(): GoogleSheet {
    if (CashflowService._googleSheet === null) {
      throw new Error('Google sheet client is not setup.');
    }
    return CashflowService._googleSheet;
  }

  static postEntry({
    date,
    category,
    amount,
    comment,
  }: NewEntryState): Promise<gapi.client.HttpRequestFulfilled<void>> {
    return CashflowService.googleSheet.insert([
      [date, category, amount, comment],
    ]);
  }

  static postEntries(
    entries: NewEntryState[]
  ): Promise<gapi.client.HttpRequestFulfilled<void>> {
    return CashflowService.googleSheet.insert(
      entries.map(({ date, category, amount, comment }) => [
        date,
        category,
        amount,
        comment,
      ])
    );
  }

  static fetchCategories(): Promise<Category[]> {
    return CashflowService.googleSheet.getCategories().then((res) => {
      if (res.status !== 200) {
        return [];
      }

      return res.result.values;
    });
  }

  static getRecentEntries(): Promise<any[]> {
    return CashflowService.googleSheet.getRecentEntries().then((res) => {
      if (res.status !== 200) {
        return [];
      }

      return res.result.values.map(
        ([date, category, amount, description, id]) => ({
          date,
          category,
          amount,
          description,
          id,
        })
      );
    });
  }

  private static groupExpenseByCategory(categories: string[], expense: any[]) {
    return categories.map((category, index) => ({
      category,
      expense: expense[index],
    }));
  }

  private static restructureMonthlyExpense(
    headers: string[],
    expense: string[]
  ): MonthlyExpense {
    const [month, ...rest] = expense;
    const [totalExpense] = rest.reverse();
    const categoryExpenses = expense.slice(1, -1);
    const categories = headers.slice(1, -1);

    return {
      month,
      totalExpense,
      expenses: CashflowService.groupExpenseByCategory(
        categories,
        categoryExpenses
      ),
    };
  }

  static getMonthlyExpenses(): Promise<MonthlyExpense[]> {
    return CashflowService.googleSheet
      .getMonthlyExpenses()
      .then((res) => {
        if (res.status !== 200) {
          return [];
        }
        return res.result.values;
      })
      .then(([header, ...expenses]) => {
        return expenses.map((expense: string[]) =>
          CashflowService.restructureMonthlyExpense(header, expense)
        );
      });
  }

  static deleteEntries(ids: number[]): Promise<number[]> {
    return CashflowService.googleSheet.deleteEntries(ids).then((res) => {
      if (res.status !== 200) {
        return [];
      }

      return ids;
    });
  }
}

export default CashflowService;
