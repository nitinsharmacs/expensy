import { Grid, List, ListItemButton, ListItemText } from '@mui/material';
import SlideUpDialog from '../../components/SlideUpDialog/SlideUpDialog';

type Expense = {
  category: string;
  expense: number;
};

type MonthlyExpense = {
  month: string;
  expenses: Expense[];
  totalExpense: string;
};

interface MonthlyExpensesProps {
  monthlyExpenses: MonthlyExpense[];
}

interface MonthlyExpenseItemProps {
  month: string;
  totalExpense: string;
}

const MonthlyExpenseItem = (
  props: MonthlyExpenseItemProps
): React.ReactElement => {
  return (
    // <ListItemButton
    //   sx={{
    //     borderBottom: '1px solid #dfe1e3',
    //   }}
    // >
    //   <ListItemText primary={props.totalExpense} secondary={props.month} />
    // </ListItemButton>
    <Grid item xs={4}>
      <ListItemButton
        sx={{
          border: '1px solid #dfe1e3',
          padding: '1em',
        }}
      >
        <ListItemText
          sx={{ textAlign: 'center' }}
          primary={props.totalExpense}
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
          />
        ))}
      </Grid>
    </SlideUpDialog>
  );
};

export default MonthlyExpenses;
