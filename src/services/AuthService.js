class AuthService {
  #credentials;
  constructor(credentials) {
    this.#credentials = credentials;
  }
  async login({ username, password }) {
    console.log(username, password);
    console.log(this.#credentials);
    return (
      username === this.#credentials.username &&
      password === this.#credentials.password
    );
  }
}

module.exports = AuthService;
