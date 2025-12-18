import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import NewEntry from './screens/NewEntry/NewEntry';
import Loader from './components/Loader/Loader';
import ToastBoard from './components/ToastBoard/ToastBoard';
import Toast from './Toast';
import PageBar from './components/PageBar/PageBar';
import { useFetchCategories, useInsertEntry } from './hooks/Cashflow';
import AppSetup, { AppSetupFormState } from '@/screens/AppSetup/AppSetup';
import { useGoogleSheet } from '@/hooks/GoogleClient';
import CashflowService from '@/services/CashflowService';
import { useGoogleLogin } from '@/hooks/Auth';
import GoogleClient from '@/models/GoogleClient';

const App = () => {
  const [loading, setLoading] = useState(false);

  const googleClient = useMemo(() => new GoogleClient(), []);

  const {
    error: loginError,
    logined,
    login,
    logout,
  } = useGoogleLogin(googleClient, setLoading);

  const {
    error: googleClientError,
    setup_required,
    client,
    setupClient,
    resetClient,
  } = useGoogleSheet(logined, googleClient, setLoading);

  const { categories, fetchCategories } = useFetchCategories(setLoading);
  const {
    error: entryError,
    isSuccess,
    insertEntry,
  } = useInsertEntry(setLoading);

  const setup_app = useCallback(
    async ({ db_spreadsheet_id, sheetId }: AppSetupFormState) => {
      if (!logined) {
        await login();
      }
      await setupClient(db_spreadsheet_id, sheetId);
    },
    [setupClient, logined, login]
  );

  const reset_app = useCallback(async () => {
    await logout();
    resetClient();
  }, [logout, resetClient]);

  useEffect(() => {
    if (!setup_required && logined) {
      CashflowService.setGoogleSheet(client);
      fetchCategories();
    }
  }, [setup_required, logined, fetchCategories, client]);

  useEffect(() => {
    if (isSuccess) Toast.insert('Created new entry successfully');
    if (loginError.isValid) Toast.insertRed(loginError.message);
    if (entryError.isValid) Toast.insertRed(entryError.message);
    if (googleClientError.isValid) Toast.insertRed(googleClientError.message);
  }, [isSuccess, entryError, loginError, googleClientError]);

  return (
    <div>
      {loading ? <Loader /> : <></>}

      {setup_required ? (
        <AppSetup onAppSetup={setup_app} />
      ) : (
        <>
          <PageBar resetApp={reset_app} />
          <NewEntry onSubmit={insertEntry} categories={categories} />
        </>
      )}
      <ToastBoard />
    </div>
  );
};

export default App;
