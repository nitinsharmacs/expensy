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
}

module.exports = CashflowService;
