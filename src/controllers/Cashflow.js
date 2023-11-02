const HttpStatus = require('../HttpStatus');
const { validateNewEntryReq } = require('../validators/requestValidators');

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
    if (!validateNewEntryReq(req.body)) {
      return res.json({ status: HttpStatus.BAD_REQUEST });
    }

    await this.#cashflowService.newEntry(req.body);

    res.json({ status: HttpStatus.CREATED });
  }
}

module.exports = CashflowController;
