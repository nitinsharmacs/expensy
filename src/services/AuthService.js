class AuthService {
  #credentials;
  constructor(credentials) {
    this.#credentials = credentials;
  }
  async login({ username, password }) {
    return (
      username === this.#credentials.username &&
      password === this.#credentials.password
    );
  }
}

module.exports = AuthService;
