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

  deleteEntries(entryIDs) {
    return this.#googleSheetsService.deleteEntries(entryIDs);
  }
}

module.exports = CashflowService;
