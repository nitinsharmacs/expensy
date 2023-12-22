class Server {
  private static active: boolean = false;

  static ping(): Promise<Response> {
    console.log('piging');

    return fetch('/ping');
  }

  static async isSleeping(): Promise<boolean> {
    console.log('issleeping');

    return new Promise((res) => {
      const timeout = setTimeout(() => {
        res(true);
      }, 3000);

      Server.ping().then(() => {
        clearTimeout(timeout);
        res(false);
      });
    });
  }
}

export default Server;
