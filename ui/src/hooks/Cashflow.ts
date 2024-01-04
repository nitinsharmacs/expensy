import React, { useEffect, useState } from 'react';
import CashflowAPIService from '../services/CashflowAPIService';
import { Category } from '../screens/NewEntry/NewEntry.types';

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
