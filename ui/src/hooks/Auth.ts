import { useCallback, useEffect, useMemo, useState } from 'react';
import { LoginFormState } from '../screens/Login/Login';
import AuthService from '../services/AuthService';
import { APIError } from '../Types';
import GoogleLogin from '@/models/GoogleLogin';
import GoogleClient from '@/models/GoogleClient';

export const useLogin = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = useState<APIError>({ message: '', isValid: false });
  const [logined, setLogined] = useState(false);

  const login = useCallback(
    async (loginCredentials: LoginFormState) => {
      try {
        setLoading(true);
        await AuthService.login(loginCredentials);
      } catch {
        setError({ message: 'Login failed, try again!', isValid: true });
        setLoading(false);
        return;
      }

      setLoading(false);
      setLogined(true);
    },
    [setLoading]
  );

  const logout = useCallback(async () => {
    await AuthService.logout();
    setLogined(false);
  }, []);

  useEffect(() => {
    if (AuthService.isLogined()) {
      setLogined(true);
    }
  }, []);

  return { error, logined, login, logout };
};

export const useGoogleLogin = (
  googleClient: GoogleClient,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = useState<APIError>({ message: '', isValid: false });
  const [logined, setLogined] = useState(false);

  const googleLogin = useMemo(
    () => new GoogleLogin(import.meta.env.VITE_CLIENT_ID),
    []
  );

  const login = useCallback(async () => {
    try {
      setLoading(true);

      await googleClient.setup();

      const previousToken = localStorage.getItem('accesstoken') || '';

      const valid = await googleLogin.isValid(previousToken);

      if (valid) {
        googleLogin.restoreSession(previousToken);

        setLoading(false);
        setLogined(true);
        return;
      }

      const token = await googleLogin.login();
      localStorage.setItem('accesstoken', token);
      setLoading(false);
      setLogined(true);
      return token;
    } catch {
      setError({ message: 'Login failed, try again!', isValid: true });
      setLoading(false);
      return '';
    }
  }, [setLoading, googleLogin, googleClient]);

  const logout = useCallback(async () => {
    await googleLogin.logout();
    localStorage.removeItem('accesstoken');
    setLogined(false);
  }, [googleLogin]);

  useEffect(() => {
    login();
  }, [login]);
  // check if browser has access token
  // check if validity of the token
  // if expired, ask for login

  // post auth, store the token

  return { error, logined, login, logout };
};
