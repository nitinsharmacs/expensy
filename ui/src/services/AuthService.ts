import { LoginFormState } from '../screens/Login/Login';

class AuthService {
  static login(loginCredentials: LoginFormState): Promise<Response> {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginCredentials),
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Login failed');
      }

      AuthService.save();
      return res.json();
    });
  }

  static isLogined(): boolean {
    return localStorage.getItem('authenticated') ? true : false;
  }

  private static save(): void {
    localStorage.setItem('authenticated', 'true');
  }

  private static remove(): void {
    localStorage.removeItem('authenticated');
  }

  static logout(): Promise<void> {
    return Promise.resolve(AuthService.remove());
  }
}

export default AuthService;
