import { Dialog, List, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import RecentEntryItem from '../../components/RecentEntryItem/RecentEntryItem';
import Loader from '../../components/Loader/Loader';
import { useRecentEntries, useSelectItem } from './RecentEntries.hooks';
import DialogBar from '../../components/DialogBar/DialogBar';
import SelectedItemsActionsPanel from '../../components/SelectedItemsActionsPanel/SelectedItemsActionsPanel';

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
  const [selectedItems, selectItem] = useSelectItem([]);

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <DialogBar title='Recent Entries' close={close} />

        <SelectedItemsActionsPanel
          open={selectedItems.length !== 0}
          selectedCounts={selectedItems.length}
          actionClick={() => alert('hi')}
        />

        <List sx={{ padding: '0' }}>
          {entries?.reverse().map((entry) => (
            <RecentEntryItem
              {...entry}
              key={`${entry.id}-${entry.date}`}
              highlight={selectedItems.includes(entry.id)}
              onClick={selectItem}
            />
          ))}
        </List>
      </Dialog>
      {loading ? <Loader /> : <></>}
    </div>
  );
};

export default RecentEntries;
