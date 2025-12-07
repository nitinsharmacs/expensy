import { useEffect, useState } from 'react';
import { MonthlyExpense } from './Types';
import { APIError } from '../../Types';
import CashflowService from '@/services/CashflowService';

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
          await CashflowService.getMonthlyExpenses();
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
