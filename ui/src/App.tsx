import { useCallback, useEffect, useState } from 'react';
import './App.css';
import NewEntry, { Category, NewEntryState } from './screens/NewEntry/NewEntry';
import CashflowAPIService from './services/CashflowAPIService';
import CashflowService from './services/CashflowService';
import Loader from './components/Loader/Loader';
import ToastBoard from './components/ToastBoard/ToastBoard';
import Toast from './Toast';
import Login, { LoginFormState } from './screens/Login/Login';
import AuthService from './services/AuthService';
import PageBar from './components/PageBar/PageBar';
import { useFetchCategories } from './hooks/Cashflow';

// yyyy-mm-dd => mm/dd/yyy
const format = (date: string) => {
  const [year, month, day] = date.split('-');
  return [month, day, year].join('/');
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [logined, setLogined] = useState(false);

  useEffect(() => {
    if (AuthService.isLogined()) {
      setLogined(true);
    }
  }, []);

  const { categories } = useFetchCategories(logined, setLoading);

  const submitHandler = useCallback(async (state: NewEntryState) => {
    const entry = { ...state };
    entry['date'] = format(entry['date']);

    setLoading(true);

    try {
      await CashflowService.create(entry);
      Toast.insert('Created new entry successfully');
    } catch (err) {
      Toast.insertRed('Inserting new entry failed, please try again!');
    } finally {
      setLoading(false);
    }
  }, []);

  const loginHandler = useCallback(async (loginCredentials: LoginFormState) => {
    setLoading(true);
    try {
      await AuthService.login(loginCredentials);
    } catch {
      Toast.insertRed('Login failed, try again!');
      setLoading(false);
      return;
    }

    setLoading(false);
    setLogined(true);
  }, []);

  const logoutHandler = useCallback(async () => {
    await AuthService.logout();
    setLogined(false);
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <></>}

      {logined ? (
        <>
          <PageBar logout={logoutHandler} />
          <NewEntry onSubmit={submitHandler} categories={categories} />
        </>
      ) : (
        <Login onLogin={loginHandler} />
      )}
      <ToastBoard />
    </div>
  );
};

export default App;
