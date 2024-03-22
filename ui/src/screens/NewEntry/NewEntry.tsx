import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import HistoryIcon from '@mui/icons-material/History';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useCallback, useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import Form from '../../components/Form/Form';
import RecentEntries from '../RecentEntries/RecentEntries';
import { NewEntryState, Category, NewEntryProps } from './NewEntry.types';
import MonthlyExpenses from '../MonthlyExpenses/MonthlyExpenses';

const getEntryState = (categories: Category[]): NewEntryState => ({
  date: new Date().toISOString().split('T')[0],
  category: categories[0] || '',
  amount: 0,
  comment: '',
});

const NewEntry = ({ onSubmit, categories }: NewEntryProps) => {
  const [formState, setFormState] = useState(getEntryState(categories));
  const [openRecentEntries, setOpenRecentEntries] = useState(false);
  const [openMonthlyExpenses, setOpenMonthlyExpenses] = useState(false);

  useEffect(() => {
    setFormState(getEntryState(categories));
  }, [categories]);

  const onFormUpdate = (
    fieldName: string,
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setFormState((prevState) => {
      const state: NewEntryState = { ...prevState };

      state[fieldName] = e.target.value;

      return state;
    });
  };

  const submit = useCallback(() => {
    onSubmit(formState);
    setFormState(getEntryState(categories));
  }, [formState, onSubmit, categories]);

  const openRecentEntriesHandler = useCallback(() => {
    setOpenRecentEntries(true);
  }, []);

  const openMonthlyExpensesHandler = useCallback(() => {
    setOpenMonthlyExpenses(true);
  }, []);

  return (
    <Page>
      <Form title='New Entry'>
        <TextField
          fullWidth
          name='date'
          type='date'
          id='date'
          value={formState['date']}
          onChange={(e) => onFormUpdate('date', e)}
          autoFocus
        />
        <FormControl fullWidth>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            labelId='category-label'
            id='category'
            label='Category'
            value={formState['category']}
            onChange={(e) => onFormUpdate('category', e)}
          >
            {categories.map((category: Category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label='Amount'
          variant='outlined'
          name='amount'
          type='number'
          id='amount'
          value={formState['amount']}
          onChange={(e) => onFormUpdate('amount', e)}
        />
        <TextField
          fullWidth
          label='Comment'
          variant='outlined'
          name='comment'
          type='text'
          id='comment'
          multiline
          minRows={5}
          value={formState['comment']}
          onChange={(e) => onFormUpdate('comment', e)}
        />
        <Button variant='contained' onClick={submit}>
          Send
        </Button>
        <Box>
          <IconButton
            sx={{ position: 'fixed', bottom: '10px', right: '10px' }}
            title='Open Recent Entries'
            onClick={openRecentEntriesHandler}
          >
            <HistoryIcon />
          </IconButton>
          <IconButton
            sx={{ position: 'fixed', bottom: '10px', right: '40px' }}
            title='Open Recent Entries'
            onClick={openMonthlyExpensesHandler}
          >
            <CalendarMonthIcon />
          </IconButton>
        </Box>
        <Box>
          <RecentEntries
            open={openRecentEntries}
            close={() => setOpenRecentEntries(false)}
          />
          <MonthlyExpenses
            open={openMonthlyExpenses}
            close={() => setOpenMonthlyExpenses(false)}
          />
        </Box>
      </Form>
    </Page>
  );
};

export default NewEntry;
