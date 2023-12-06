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
import React, { useEffect, useState } from 'react';
import RecentEntryItem, {
  RecentEntryItemProps,
} from '../../components/RecentEntryItem/RecentEntryItem';
import CashflowService from '../../services/CashflowService';

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

const useRecentEntries = () => {
  const [entries, setEntries] = useState<RecentEntryItemProps[]>([]);

  useEffect(() => {
    const getRecentEntries = async () => {
      const recentEntries: RecentEntryItemProps[] =
        await CashflowService.getRecentEntries();

      setEntries(recentEntries);
    };

    getRecentEntries();
  }, []);

  return [entries];
};

const RecentEntries = ({ close, open }: RecentEntriesProps) => {
  const [entries] = useRecentEntries();

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
          {entries?.map((entry) => (
            <RecentEntryItem {...entry} />
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default RecentEntries;
