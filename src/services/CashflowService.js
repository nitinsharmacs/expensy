class CashflowService {
  #googleSheetsService;

  constructor(googleSheetsService) {
    this.#googleSheetsService = googleSheetsService;
  }

  newEntry({ date, category, amount, comment }) {
    return this.#googleSheetsService.insert([
      [date, category, amount, comment],
    ]);
  }

  insertEntries(entries) {
    return this.#googleSheetsService.insert(
      entries.map(({ date, category, amount, comment }) => [
        date,
        category,
        amount,
        comment,
      ])
    );
  }

  async getCategories() {
    const categories = await this.#googleSheetsService.getCategories();
    return categories.flatMap((category) => category);
  }

  async getRecentEntries() {
    const entries = await this.#googleSheetsService.getRecentEntries();

    return entries.map(([date, category, amount, description, id]) => ({
      date,
      category,
      amount,
      description,
      id,
    }));
  }

  #groupExpenseByCategory(categories, expense) {
    return categories.map((category, index) => ({
      category,
      expense: expense[index],
    }));
  }

  #restructureMonthlyExpense(headers, expense) {
    const [month, ...rest] = expense;
    const [totalExpense] = rest.reverse();
    const categoryExpenses = expense.slice(1, -1);
    const categories = headers.slice(1, -1);

    return {
      month,
      totalExpense,
      expenses: this.#groupExpenseByCategory(categories, categoryExpenses),
    };
  }

  async getMonthlyExpenses() {
    const [header, ...expenses] =
      await this.#googleSheetsService.getMonthlyExpenses();

    return expenses.map((expense) =>
      this.#restructureMonthlyExpense(header, expense)
    );
  }

  deleteEntries(entryIDs) {
    return this.#googleSheetsService.deleteEntries(entryIDs);
  }
}

module.exports = CashflowService;
