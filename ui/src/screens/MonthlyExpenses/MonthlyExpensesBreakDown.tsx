import Chart from 'react-google-charts';
import SlideUpDialog from '../../components/SlideUpDialog/SlideUpDialog';
import { MonthlyExpense } from './Types';
import ColumnChart from '../../components/charts/ColumnChart/ColumnChart';
import { Box, Container, Divider, Typography } from '@mui/material';
import PieChart from '../../components/charts/PieChart/PieChart';
const janExpense = {
  month: 'Jan-2024',
  totalExpense: '-200000',
  expenses: [
    { category: 'Travel', expense: -6865.62 },
    { category: 'Education', expense: -101 },
    { category: 'Subscriptions', expense: 0 },
    { category: 'Rent & Bills', expense: -7609 },
    { category: 'Health & food', expense: -7127 },
    { category: 'Medical', expense: -170 },
    { category: 'Life Style', expense: 0 },
  ],
};

const MonthlyExpensesBreakDown = (props: MonthlyExpense) => {
  return (
    <SlideUpDialog title={props.month} open={true} close={() => alert('sf')}>
      <Container maxWidth='lg' disableGutters sx={{ padding: '0.5em 0' }}>
        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
          Expense Distribution
        </Typography>
        <Box>
          <ColumnChart
            title='Expenses'
            data={janExpense.expenses.map((expense) => ({
              xAxis: expense.category,
              yAxis: Math.abs(expense.expense),
            }))}
          />
        </Box>
        <Divider />
        <Box sx={{ margin: '0.5em 0' }}>
          <PieChart
            title='Categories'
            data={janExpense.expenses.map((expense) => ({
              label: expense.category,
              value: Math.abs(expense.expense),
            }))}
          />
        </Box>
      </Container>
    </SlideUpDialog>
  );
};

export default MonthlyExpensesBreakDown;
