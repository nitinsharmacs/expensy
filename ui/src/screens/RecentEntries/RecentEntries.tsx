import {
  AppBar,
  Dialog,
  IconButton,
  List,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import RecentEntryItem from '../../components/RecentEntryItem/RecentEntryItem';
import Loader from '../../components/Loader/Loader';
import { useRecentEntries } from './RecentEntries.hooks';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface RecentEntriesProps {
  open: boolean;
  close: () => void;
}

const RecentEntries = ({ close, open }: RecentEntriesProps) => {
  const [entries, loading] = useRecentEntries(open);

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'sticky' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close'
              onClick={close}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Recent Entries
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {entries?.reverse().map((entry, index) => (
            <RecentEntryItem {...entry} key={index} />
          ))}
        </List>
      </Dialog>
      {loading ? <Loader /> : <></>}
    </div>
  );
};

export default RecentEntries;
