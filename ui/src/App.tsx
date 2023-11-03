import './App.css';
import NewEntry from './screens/NewEntry/NewEntry';

const App = () => {
  return <NewEntry onSubmit={console.log} />;
};

export default App;
