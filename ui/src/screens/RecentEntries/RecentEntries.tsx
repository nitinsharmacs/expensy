import { Dialog, List, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect } from 'react';
import RecentEntryItem from '../../components/RecentEntryItem/RecentEntryItem';
import Loader from '../../components/Loader/Loader';
import {
  useDeleteItems,
  useRecentEntries,
  useSelectItem,
} from './RecentEntries.hooks';
import DialogBar from '../../components/DialogBar/DialogBar';
import SelectedItemsActionsPanel from '../../components/SelectedItemsActionsPanel/SelectedItemsActionsPanel';
import Toast from '../../Toast';

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
  const [selectedItems, selectItem, clear] = useSelectItem([]);
  const [isLoading, isSuccess, error, deleteItems] = useDeleteItems();

  useEffect(() => {
    if (isSuccess) Toast.insert('Item deleted successfully');
    if (error.isValid) Toast.insertRed(error.message);
  }, [isSuccess, error]);

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <DialogBar title='Recent Entries' close={close} />

        <SelectedItemsActionsPanel
          open={selectedItems.length !== 0}
          selectedCounts={selectedItems.length}
          actionClick={() => {
            deleteItems(selectedItems);
            clear();
          }}
        />

        <List sx={{ padding: '0' }}>
          {entries?.map((entry) => (
            <RecentEntryItem
              {...entry}
              key={`${entry.id}-${entry.date}`}
              highlight={selectedItems.includes(entry.id)}
              onClick={selectItem}
            />
          ))}
        </List>
      </Dialog>
      {loading || isLoading ? <Loader /> : <></>}
    </div>
  );
};

export default RecentEntries;
