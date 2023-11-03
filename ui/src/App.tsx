import { useCallback, useState } from 'react';
import './App.css';
import NewEntry, { NewEntryState } from './screens/NewEntry/NewEntry';
import NewEntryService from './services/newEntry';
import Loader from './components/Loader/Loader';
import ToastBoard from './components/ToastBoard/ToastBoard';
import Toast from './Toast';

// yyyy-mm-dd => mm/dd/yyy
const format = (date: string) => {
  const [year, month, day] = date.split('-');
  return [month, day, year].join('/');
};

const App = () => {
  const [loading, setLoading] = useState(false);

  const submitHandler = useCallback(async (state: NewEntryState) => {
    const entry = { ...state };
    entry['date'] = format(entry['date']);

    setLoading(true);
    await NewEntryService.create(entry);
    setLoading(false);

    Toast.insert('Created new entry successfully');
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <></>}
      <NewEntry onSubmit={submitHandler} />
      <ToastBoard />
    </div>
  );
};

export default App;
