import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DialogBarProps {
  title: string;
  close: () => void;
}

const DialogBar = (props: DialogBarProps) => {
  return (
    <AppBar sx={{ position: 'sticky' }}>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='close'
          onClick={props.close}
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DialogBar;
