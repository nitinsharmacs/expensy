/* eslint-disable @typescript-eslint/ban-ts-comment */

class GoogleLogin {
  private static CLIENT_ID =
    '696940407752-erj2i3vslg931cth5qrs7r1k47v2hbce.apps.googleusercontent.com';
  private static SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

  private tokenClient: google.accounts.oauth2.TokenClient;

  constructor() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GoogleLogin.CLIENT_ID,
      scope: GoogleLogin.SCOPES,
      callback: () => {},
    });
  }

  async login(): Promise<string> {
    return new Promise((res, rej) => {
      // @ts-ignore
      this.tokenClient.callback = (response: any) => {
        console.log(response);
        if (response.error) {
          rej(response.error);
        }
        res(response.access_token);
      };

      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    });
  }

  restoreSession(token: string) {
    gapi.client.setToken({ access_token: token });
  }

  async isValid(token: string): Promise<boolean> {
    const resp = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${token}`
    );
    if (!resp.ok) {
      return false;
    }
    const info = await resp.json();
    return info.aud === GoogleLogin.CLIENT_ID;
  }

  async logout(): Promise<void> {
    gapi.client.setToken({ access_token: '' });
  }
}

export default GoogleLogin;
