const HttpStatus = require('../HttpStatus');
const { validateNewEntryReq } = require('../validators/requestValidators');

class CashflowController {
  #cashflowService;
  constructor(cashflowService) {
    this.#cashflowService = cashflowService;
    this.read = this.read.bind(this);
    this.newEntry = this.newEntry.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getRecentEntries = this.getRecentEntries.bind(this);
  }

  async read(_, res) {
    res.json({ status: HttpStatus.OK });
  }

  async newEntry(req, res) {
    if (!validateNewEntryReq(req.body)) {
      return res.json({ status: HttpStatus.BAD_REQUEST });
    }

    await this.#cashflowService.newEntry(req.body);

    res.json({ status: HttpStatus.CREATED });
  }

  async getCategories(_, res) {
    const categories = await this.#cashflowService.getCategories();

    res.status(200).json({ status: HttpStatus.OK, categories });
  }

  async getRecentEntries(_, res) {
    const entries = await this.#cashflowService.getRecentEntries();

    res.status(200).json({ status: HttpStatus.OK, entries });
  }
}

module.exports = CashflowController;
