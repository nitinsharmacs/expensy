class AuthController {
  #authService;

  constructor(authService) {
    this.#authService = authService;
  }

  login = async (req, res) => {
    if (await this.#authService.login(req.body)) {
      req.session.user = req.body.username;
      await req.session.save();
      return res.json({ message: 'success' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  };
}

module.exports = AuthController;
