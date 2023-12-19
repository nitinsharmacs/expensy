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

  async getCategories() {
    const categories = await this.#googleSheetsService.getCategories();
    return categories.flatMap((category) => category);
  }

  async getRecentEntries() {
    const entries = await this.#googleSheetsService.getRecentEntries();

    return entries.map(([date, category, amount, description]) => ({
      date,
      category,
      amount,
      description,
    }));
  }
}

module.exports = CashflowService;
