import { useEffect, useState } from 'react';
import { MonthlyExpense } from './Types';
import CashflowAPIService from '../../services/CashflowAPIService';
import { APIError } from '../../Types';

const _monthlyExpenses = [
  {
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
  },
  { month: 'Feb-2024', totalExpense: '-1000', expenses: [] },
  { month: 'Mar-2024', totalExpense: '-200', expenses: [] },
  { month: 'Apr-2024', totalExpense: '-200', expenses: [] },
  { month: 'May-2024', totalExpense: '-200', expenses: [] },
  { month: 'Jun-2024', totalExpense: '-1400', expenses: [] },
  { month: 'July-2024', totalExpense: '-1400', expenses: [] },
  { month: 'Aug-2024', totalExpense: '-1400', expenses: [] },
  { month: 'Sep-2024', totalExpense: '-1400', expenses: [] },
  { month: 'Oct-2024', totalExpense: '-1400', expenses: [] },
  { month: 'Nov-2024', totalExpense: '-1400', expenses: [] },
  { month: 'Dec-2024', totalExpense: '-1400', expenses: [] },
];

export const useMonthlyExpenses = (
  open: boolean
): [MonthlyExpense[], boolean, APIError] => {
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError>({ isValid: false, message: '' });

  useEffect(() => {
    const getMonthlyExpenses = async () => {
      setLoading(true);
      setMonthlyExpenses([]);

      try {
        const monthlyExpenses: MonthlyExpense[] =
          await CashflowAPIService.getMonthlyExpenses();
        setMonthlyExpenses(monthlyExpenses);
      } catch (err) {
        setError({ isValid: true, message: "Couldn't load monthly expenses" });
      } finally {
        setLoading(false);
      }
    };

    if (open) getMonthlyExpenses();
  }, [open]);

  return [monthlyExpenses, loading, error];
};
