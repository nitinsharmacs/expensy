class Server {
  static ping(): Promise<Response> {
    return fetch('/ping');
  }

  static async isSleeping(): Promise<boolean> {
    console.log('issleeping');

    return new Promise((res) => {
      const timeout = setTimeout(() => {
        res(true);
      }, 3000);

      Server.ping()
        .then(() => {
          clearTimeout(timeout);
          res(false);
        })
        .catch(() => res(true));
    });
  }
}

export default Server;
