const HttpStatus = require('../HttpStatus');
const { validateNewEntryReq } = require('../validators/requestValidators');

class CashflowController {
  #cashflowService;
  constructor(cashflowService) {
    this.#cashflowService = cashflowService;
    this.read = this.read.bind(this);
    this.newEntry = this.newEntry.bind(this);
    this.insertEntries = this.insertEntries.bind(this);
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

  async insertEntries(req, res) {
    await this.#cashflowService.insertEntries(req.body);
    res.json({ status: HttpStatus.CREATED });
  }

  async getCategories(_, res) {
    return res.status(200).json({
      status: 'ok',
      categories: ['Health & food', 'Travel', 'Medical'],
    });
    const categories = await this.#cashflowService.getCategories();

    res.status(200).json({ status: HttpStatus.OK, categories });
  }

  async getRecentEntries(_, res) {
    return res.status(200).json({
      status: 'ok',
      entries: [
        {
          date: '12/19/2023',
          category: 'Health & food',
          amount: '44',
          description: 'adsfads',
          id: '4',
        },
        {
          date: '12/22/2023',
          category: 'Health & food',
          amount: '3333',
          description: 'test',
          id: '5',
        },
        {
          date: '12/22/2023',
          category: 'Health & food',
          amount: '420',
          description: 'asdf',
          id: '6',
        },
        {
          date: '12/22/2023',
          category: 'Health & food',
          amount: '2341',
          description: 'adsfasd',
          id: '7',
        },
        {
          date: '03/19/2024',
          category: 'Health & food',
          amount: '0',
          description: '',
          id: '8',
        },
        {
          date: '03/19/2024',
          category: 'Health & food',
          amount: '0',
          description: '',
          id: '9',
        },
        {
          date: '03/19/2024',
          category: 'Health & food',
          amount: '20000',
          description: 'testse',
          id: '10',
        },
        {
          date: '03/19/2024',
          category: 'Health & food',
          amount: '0',
          description: '',
          id: '11',
        },
        {
          date: '03/20/2024',
          category: 'Health & food',
          amount: '0',
          description: '',
          id: '12',
        },
        {
          date: '03/20/2024',
          category: 'Health & food',
          amount: '3333',
          description: 'testtest',
          id: '13',
        },
      ],
    });
    const entries = await this.#cashflowService.getRecentEntries();

    res.status(200).json({ status: HttpStatus.OK, entries });
  }

  getMonthlyExpenses = async (req, res) => {
    const expenses = await this.#cashflowService.getMonthlyExpenses();
    return res.status(200).json({ expenses, status: HttpStatus.OK });
  };

  deleteEntries = async (req, res) => {
    await this.#cashflowService.deleteEntries(req.body.entryIDs);
    res.status(200).json({ status: HttpStatus.OK });
  };
}

module.exports = CashflowController;
