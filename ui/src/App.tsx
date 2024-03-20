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
import MonthlyExpenses from './screens/MonthlyExpenses/MonthlyExpenses';

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

  const monthlyExpenses = [
    { month: 'Jan-2024', totalExpense: '-2000', expenses: [] },
    { month: 'Feb-2024', totalExpense: '-1000', expenses: [] },
    { month: 'Mar-2024', totalExpense: '-200', expenses: [] },
    { month: 'Apr-2024', totalExpense: '-200', expenses: [] },
    { month: 'May-2024', totalExpense: '-200', expenses: [] },
    { month: 'Jun-2024', totalExpense: '-1400', expenses: [] },
    { month: 'July-2024', totalExpense: '-1400', expenses: [] },
    { month: 'Aug-2024', totalExpense: '-1400', expenses: [] },
    { month: 'Sep-2024', totalExpense: '-1400', expenses: [] },
    { month: 'Oct-2024', totalExpense: '-1400', expenses: [] },
    { month: 'Nov-2024', totalExpense: '-1400', expenses: [] },
    { month: 'Dec-2024', totalExpense: '-1400', expenses: [] },
  ];
  return (
    <div>
      {loading ? <Loader /> : <></>}

      {logined ? (
        <>
          <PageBar logout={logout} />
          {/* <NewEntry onSubmit={insertEntry} categories={categories} /> */}
          <MonthlyExpenses monthlyExpenses={monthlyExpenses} />
        </>
      ) : (
        <Login onLogin={login} />
      )}
      <ToastBoard />
    </div>
  );
};

export default App;
