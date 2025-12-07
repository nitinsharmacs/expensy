import { AppBar, IconButton, Toolbar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface PageBarProps {
  resetApp: () => void;
}

const PageBar = (props: PageBarProps) => {
  return (
    <AppBar position='absolute'>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          sx={{ color: 'white' }}
          title='reset-app'
          onClick={props.resetApp}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default PageBar;
