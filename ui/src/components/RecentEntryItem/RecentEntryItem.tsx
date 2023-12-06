import { ListItem, ListItemText } from '@mui/material';

export type RecentEntryItemProps = {
  category: string;
  amount: string;
  date: string;
  description: string;
};

type PrimaryContentProps = {
  increment: boolean;
  amount: string;
  date: string;
  category: string;
};

const PrimaryContent = (props: PrimaryContentProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <span
      style={{ color: props.increment ? 'green' : 'red', fontSize: '26px' }}
    >
      {props.amount}
    </span>
    <span>{props.category}</span>
    <span>{props.date}</span>
  </div>
);

const RecentEntryItem = (props: RecentEntryItemProps) => {
  return (
    <ListItem sx={{ borderBottom: '1px solid gray' }}>
      <ListItemText
        primary={
          <PrimaryContent {...props} increment={props.amount.includes('+')} />
        }
        secondary={props.description}
      />
    </ListItem>
  );
};

export default RecentEntryItem;
