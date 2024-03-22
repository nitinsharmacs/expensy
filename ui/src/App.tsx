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
import MonthlyExpensesBreakDown from './screens/MonthlyExpenses/MonthlyExpensesBreakDown';

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
    {
      month: 'Jan-2024',
      totalExpense: '-200000',
      expenses: [
        { category: 'Travel', expense: -6865.62 },
        { category: 'Education', expense: -101 },
        { category: 'Subscriptions', expense: 0 },
        { category: 'Rent & Bills', expense: -7609 },
        { category: 'Health & food', expense: -7127 },
        { category: 'Medical', expense: -170 },
        { category: 'Life Style', expense: 0 },
      ],
    },
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
          {/* <MonthlyExpenses monthlyExpenses={monthlyExpenses} /> */}
        </>
      ) : (
        // <MonthlyExpenses monthlyExpenses={monthlyExpenses} />
        // <Login onLogin={login} />
        <MonthlyExpensesBreakDown {...monthlyExpenses[0]} />
      )}
      <ToastBoard />
    </div>
  );
};

export default App;
