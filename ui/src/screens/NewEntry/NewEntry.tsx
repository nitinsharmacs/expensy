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
import { useState } from 'react';

type Category = {
  label: string;
  value: string;
};

type FormState = {
  date: string;
  category: string;
  amount: number;
  comment: string;
};

export interface NewEntryProps {
  onSubmit: (state: FormState) => void;
}

const categories: Category[] = [
  { label: 'Health', value: 'health' },
  { label: 'Travel', value: 'travel' },
];

const getEntryState = (): FormState => ({
  date: new Date().toISOString().split('T')[0],
  category: categories[0].value,
  amount: 0,
  comment: 'Purchased a chocholate',
});

const NewEntry = (props: NewEntryProps) => {
  const [formState, setFormState] = useState(getEntryState());

  const onFormUpdate = (
    fieldName: string,
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setFormState((prevState) => {
      const state: FormState = { ...prevState };

      state[fieldName] = e.target.value;

      return state;
    });
  };

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
            {categories.map(({ value, label }: Category) => (
              <MenuItem key={label} value={value}>
                {label}
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
        <Button variant='contained' onClick={() => props.onSubmit(formState)}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default NewEntry;
