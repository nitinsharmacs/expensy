import { useEffect, useState } from 'react';
import './App.css';
import NewEntry from './screens/NewEntry/NewEntry';
import Loader from './components/Loader/Loader';
import ToastBoard from './components/ToastBoard/ToastBoard';
import Toast from './Toast';
import Login from './screens/Login/Login';
import PageBar from './components/PageBar/PageBar';
import { useFetchCategories, useInsertEntry } from './hooks/Cashflow';
import { useLogin } from './hooks/Auth';

const App = () => {
  const [loading, setLoading] = useState(false);
  const { login, logout, logined, error: loginError } = useLogin(setLoading);

  const { categories } = useFetchCategories(logined, setLoading);
  const {
    error: entryError,
    isSuccess,
    insertEntry,
  } = useInsertEntry(setLoading);

  useEffect(() => {
    if (isSuccess) Toast.insert('Created new entry successfully');
    if (loginError.isValid) Toast.insertRed(loginError.message);
    if (entryError.isValid) Toast.insertRed(entryError.message);
  }, [isSuccess, loginError, entryError]);

  return (
    <div>
      {loading ? <Loader /> : <></>}

      {logined ? (
        <>
          <PageBar logout={logout} />
          <NewEntry onSubmit={insertEntry} categories={categories} />
        </>
      ) : (
        <Login onLogin={login} />
      )}
      <ToastBoard />
    </div>
  );
};

export default App;
