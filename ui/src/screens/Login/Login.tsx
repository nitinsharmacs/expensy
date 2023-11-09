import { Button, TextField } from '@mui/material';
import Form from '../../components/Form/Form';
import Page from '../../components/Page/Page';
import { useState } from 'react';

export type LoginFormState = {
  username: string;
  password: string;
};

interface LoginProps {
  onLogin: (state: LoginFormState) => void;
}

const initialState: LoginFormState = {
  username: '',
  password: '',
};

const Login = (props: LoginProps) => {
  const [formState, setFormState] = useState<LoginFormState>(initialState);

  return (
    <Page>
      <Form title='Login'>
        <TextField
          fullWidth
          name='username'
          type='text'
          id='username'
          autoFocus
          label='Username'
          value={formState['username']}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <TextField
          fullWidth
          name='password'
          type='password'
          id='password'
          label='Password'
          value={formState['password']}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button variant='contained' onClick={() => props.onLogin(formState)}>
          Login
        </Button>
      </Form>
    </Page>
  );
};

export default Login;
