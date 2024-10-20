import { ListItemButton, ListItemText } from '@mui/material';

export type RecentEntryItemProps = {
  category: string;
  amount: string;
  date: string;
  description: string;
  id: number;
  highlight: boolean;
  onClick: (id: number) => void;
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
    <ListItemButton
      sx={{
        borderBottom: '1px solid #dfe1e3',
        '&.Mui-selected': {
          backgroundColor: '#dfe1e3',
        },
      }}
      onClick={() => props.onClick(props.id)}
      selected={props.highlight}
    >
      <ListItemText
        primary={
          <PrimaryContent {...props} increment={!props.amount.includes('-')} />
        }
        secondary={props.description}
      />
    </ListItemButton>
  );
};

export default RecentEntryItem;
