import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import './newentry.css';
import { useCallback, useEffect, useState } from 'react';

export type Category = string;

export type NewEntryState = { [key: string]: string | number } & {
  date: string;
  category: string;
  amount: number;
  comment: string;
};

export interface NewEntryProps {
  onSubmit: (state: NewEntryState) => void;
  categories: Category[];
}

const getEntryState = (categories: Category[]): NewEntryState => ({
  date: new Date().toISOString().split('T')[0],
  category: categories[0] || '',
  amount: 0,
  comment: '',
});

const NewEntry = ({ onSubmit, categories }: NewEntryProps) => {
  const [formState, setFormState] = useState(getEntryState(categories));

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

  return (
    <div className='new_entry_page'>
      <header>
        <h2>New Entry</h2>
      </header>

      <form className='new_entry_form' action=''>
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
      </form>
    </div>
  );
};

export default NewEntry;
