import React, { useCallback, useEffect, useState } from 'react';
import CashflowAPIService from '../services/CashflowAPIService';
import { Category, NewEntryState } from '../screens/NewEntry/NewEntry.types';
import CashflowService from '../services/CashflowService';
import { APIError } from '../Types';
export const useFetchCategories = (
  logined: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): { categories: Category[] } => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!logined) {
      return;
    }
    setLoading(true);

    CashflowAPIService.fetchCategories().then((expenseCategories) => {
      setCategories(expenseCategories);
      setLoading(false);
    });
  }, [logined, setLoading]);

  return { categories };
};

// yyyy-mm-dd => mm/dd/yyy
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
      const entry = { ...state };
      entry['date'] = format(entry['date']);

      setLoading(true);

      try {
        await CashflowService.create(entry);
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
