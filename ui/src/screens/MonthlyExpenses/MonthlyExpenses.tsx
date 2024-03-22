import { Grid, ListItemButton, ListItemText } from '@mui/material';
import SlideUpDialog from '../../components/SlideUpDialog/SlideUpDialog';
import { MonthlyExpenseItemProps, MonthlyExpensesProps } from './Types';
import { useMonthlyExpenses } from './MonthlyExpenses.hook';
import Loader from '../../components/Loader/Loader';
import { useEffect } from 'react';
import Toast from '../../Toast';

const Amount = ({ value }: { value: string }) => {
  return (
    <span
      style={{
        fontSize: '1em',
        color: value.includes('-') ? 'red' : 'inherit',
      }}
    >
      {value}
    </span>
  );
};

const MonthlyExpenseItem = (
  props: MonthlyExpenseItemProps
): React.ReactElement => {
  return (
    <Grid item xs={4}>
      <ListItemButton
        sx={{
          border: '1px solid #dfe1e3',
          padding: '1em',
        }}
      >
        <ListItemText
          sx={{ textAlign: 'center' }}
          primary={<Amount value={props.totalExpense} />}
          secondary={props.month}
        />
      </ListItemButton>
    </Grid>
  );
};

const MonthlyExpenses = (props: MonthlyExpensesProps) => {
  const [monthlyExpenses, loading, error] = useMonthlyExpenses(props.open);

  useEffect(() => {
    if (error.isValid) Toast.insertRed(error.message);
  }, [error]);

  return (
    <SlideUpDialog
      open={props.open}
      close={props.close}
      title='Monthly Expense'
    >
      <Grid container spacing={2} sx={{ padding: '1em' }}>
        {monthlyExpenses?.map((monthlyExpense) => (
          <MonthlyExpenseItem
            month={monthlyExpense.month}
            totalExpense={monthlyExpense.totalExpense}
            key={monthlyExpense.month}
          />
        ))}
      </Grid>
      {loading ? <Loader /> : <></>}
    </SlideUpDialog>
  );
};

export default MonthlyExpenses;
