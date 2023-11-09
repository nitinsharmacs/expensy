import { LoginFormState } from '../screens/Login/Login';

class AuthService {
  static login(loginCredentials: LoginFormState): Promise<Response> {
    return fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(loginCredentials),
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error('Login failed');
      }

      return res.json();
    });
  }
}

export default AuthService;
