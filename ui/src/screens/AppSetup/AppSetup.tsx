import { Button, TextField, Typography } from '@mui/material';
import Form from '../../components/Form/Form';
import Page from '../../components/Page/Page';
import { useState } from 'react';

export type AppSetupFormState = {
  db_spreadsheet_id: string;
};

interface AppSetupProps {
  onAppSetup: (state: AppSetupFormState) => Promise<void>;
}

const initialState: AppSetupFormState = {
  db_spreadsheet_id: '',
};

const AppSetup = (props: AppSetupProps) => {
  const [formState, setFormState] = useState<AppSetupFormState>(initialState);

  return (
    <Page>
      <Form title='Expensy Setup'>
        <Typography
          fontSize='small'
          variant='caption'
          gutterBottom
          color='gray'
        >
          Setup is required to provide access to Google spreadsheets.
        </Typography>
        <TextField
          fullWidth
          name='db_spreadsheet_id'
          type='text'
          id='db_spreadsheet_id'
          label='Spreadsheet ID'
          value={formState['db_spreadsheet_id']}
          helperText='Spreadsheet to use for App. You can get it from the  spreadsheet url. For example, https://docs.google.com/spreadsheets/d/<ID>/edit?gid=0.'
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              db_spreadsheet_id: e.target.value,
            }))
          }
        />
        <Button variant='contained' onClick={() => props.onAppSetup(formState)}>
          Setup
        </Button>
      </Form>
    </Page>
  );
};

export default AppSetup;
