import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
        {/* <IconButton
          autoFocus
          color='inherit'
          aria-label='delete'
          onClick={props.close}
        >
          <DeleteOutlineIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default DialogBar;
