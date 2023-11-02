const HttpStatus = require('../HttpStatus');

class CashflowController {
  #cashflowService;
  constructor(cashflowService) {
    this.#cashflowService = cashflowService;
    this.read = this.read.bind(this);
    this.newEntry = this.newEntry.bind(this);
  }

  async read(_, res) {
    res.json({ status: HttpStatus.OK });
  }

  async newEntry(req, res) {
    await this.#cashflowService.newEntry(req.body);
    res.json({ status: HttpStatus.CREATED });
  }
}

module.exports = CashflowController;
