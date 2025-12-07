class GoogleClient {
  private _client: typeof gapi.client;
  private loaded: boolean;

  constructor() {
    this._client = gapi.client;
    this.loaded = false;
  }

  setup(): Promise<void> {
    if (this.loaded) {
      return Promise.resolve();
    }

    return new Promise<void>((res, rej) => {
      gapi.load('client', () => {
        gapi.client
          .init({
            apiKey: '',
            discoveryDocs: [
              'https://sheets.googleapis.com/$discovery/rest?version=v4',
            ],
          })
          .then(() => {
            this._client = gapi.client;
            this.loaded = true;
            res();
          })
          .catch(rej);
      });
    });
  }

  get client() {
    return this._client;
  }
}

export default GoogleClient;
