import { useCallback, useEffect, useState } from 'react';
import { LoginFormState } from '../screens/Login/Login';
import AuthService from '../services/AuthService';
import { APIError } from '../Types';

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
