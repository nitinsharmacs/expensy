import SlideUpDialog from '../../components/SlideUpDialog/SlideUpDialog';
import { MonthlyExpensesBreakdownProps } from './Types';
import ColumnChart from '../../components/charts/ColumnChart/ColumnChart';
import { Box, Container, Divider, Typography } from '@mui/material';
import PieChart from '../../components/charts/PieChart/PieChart';

const MonthlyExpensesBreakDown = ({
  open,
  monthlyExpense,
  close,
}: MonthlyExpensesBreakdownProps) => {
  return (
    <SlideUpDialog title={monthlyExpense.month} open={open} close={close}>
      <Container maxWidth='lg' disableGutters sx={{ padding: '0.5em 0' }}>
        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
          Expense Distribution
        </Typography>
        <Box>
          <ColumnChart
            title='Expenses'
            data={monthlyExpense?.expenses?.map((expense) => ({
              xAxis: expense.category,
              yAxis: Math.abs(expense.expense),
            }))}
          />
        </Box>
        <Divider />
        <Box sx={{ margin: '0.5em 0' }}>
          <PieChart
            title='Categories'
            data={monthlyExpense?.expenses?.map((expense) => ({
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
