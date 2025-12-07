import React, { useCallback, useState } from 'react';
import { Category, NewEntryState } from '../screens/NewEntry/NewEntry.types';
import { APIError } from '../Types';
import CashflowService from '@/services/CashflowService';

export const useFetchCategories = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(() => {
    setLoading(true);

    CashflowService.fetchCategories().then((expenseCategories) => {
      setCategories(expenseCategories);
      setLoading(false);
    });
  }, [setLoading]);

  return { categories, fetchCategories };
};

// yyyy-mm-dd => mm/dd/yyyy
const format = (date: string) => {
  const [year, month, day] = date.split('-');
  return [month, day, year].join('/');
};

export const useInsertEntry = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = useState<APIError>({ message: '', isValid: false });
  const [isSuccess, setIsSuccess] = useState(false);

  const insertEntry = useCallback(
    async (state: NewEntryState) => {
      const entry = { ...state, category: state['category'][0] };
      entry['date'] = format(entry['date']);

      setLoading(true);

      try {
        await CashflowService.postEntry(entry);
        setIsSuccess(true);
      } catch (err) {
        setError({
          message: 'Inserting new entry failed, please try again!',
          isValid: true,
        });
      } finally {
        setLoading(false);
        setError({ message: '', isValid: false });
      }
    },
    [setLoading]
  );

  return { insertEntry, error, isSuccess };
};
