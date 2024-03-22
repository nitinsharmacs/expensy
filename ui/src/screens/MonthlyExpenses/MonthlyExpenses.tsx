import { Grid, ListItemButton, ListItemText } from '@mui/material';
import SlideUpDialog from '../../components/SlideUpDialog/SlideUpDialog';
import {
  MonthlyExpense,
  MonthlyExpenseItemProps,
  MonthlyExpensesProps,
} from './Types';
import { useMonthlyExpenses } from './MonthlyExpenses.hook';
import Loader from '../../components/Loader/Loader';
import { useCallback, useEffect, useState } from 'react';
import Toast from '../../Toast';
import MonthlyExpensesBreakDown from './MonthlyExpensesBreakDown';

const sampleJanExpense = {
  month: 'Jan-2024',
  totalExpense: '0',
  expenses: [
    { category: 'Travel', expense: 0 },
    { category: 'Education', expense: 0 },
    { category: 'Subscriptions', expense: 0 },
    { category: 'Rent & Bills', expense: 0 },
    { category: 'Health & food', expense: 0 },
    { category: 'Medical', expense: 0 },
    { category: 'Life Style', expense: 0 },
  ],
};

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
        onClick={() => props.onClick(props.month)}
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
  const [breakdownMonthExpense, setBreakdownMonthExpense] =
    useState<MonthlyExpense>();

  const openBreakDownHandler = useCallback(
    (month: string) => {
      const expense = monthlyExpenses?.find(
        (expense) => expense.month === month
      );
      setBreakdownMonthExpense(expense);
    },
    [monthlyExpenses]
  );

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
            onClick={openBreakDownHandler}
          />
        ))}
      </Grid>
      <MonthlyExpensesBreakDown
        open={breakdownMonthExpense ? true : false}
        monthlyExpense={breakdownMonthExpense || sampleJanExpense}
        close={() => openBreakDownHandler('')}
      />
      {loading ? <Loader /> : <></>}
    </SlideUpDialog>
  );
};

export default MonthlyExpenses;
