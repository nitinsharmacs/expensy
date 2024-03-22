import { Grid, ListItemButton, ListItemText } from '@mui/material';
import SlideUpDialog from '../../components/SlideUpDialog/SlideUpDialog';
import { MonthlyExpenseItemProps, MonthlyExpensesProps } from './Types';

const Amount = (props: { value: string }) => {
  return <span style={{ fontSize: '1.2em', color: 'red' }}>{props.value}</span>;
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
  return (
    <SlideUpDialog open={true} close={() => {}} title='Monthly Expense'>
      <Grid container spacing={2} sx={{ padding: '1em' }}>
        {props.monthlyExpenses.map((monthlyExpense) => (
          <MonthlyExpenseItem
            month={monthlyExpense.month}
            totalExpense={monthlyExpense.totalExpense}
            key={monthlyExpense.month}
          />
        ))}
      </Grid>
    </SlideUpDialog>
  );
};

export default MonthlyExpenses;
