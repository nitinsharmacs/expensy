import { useCallback, useEffect, useState } from 'react';
import { RecentEntryItemProps } from '../../components/RecentEntryItem/RecentEntryItem';
import CashflowAPIService from '../../services/CashflowAPIService';

export const useRecentEntries = (
  open: boolean
): [RecentEntryItemProps[], boolean] => {
  const [entries, setEntries] = useState<RecentEntryItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRecentEntries = async () => {
      setLoading(true);
      setEntries([]);
      const recentEntries: RecentEntryItemProps[] =
        await CashflowAPIService.getRecentEntries();

      setLoading(false);
      setEntries(recentEntries);
    };

    if (open) getRecentEntries();
  }, [open]);

  return [entries, loading];
};

export const useSelectItem = (
  defaultItems: number[]
): [number[], (id: number) => void] => {
  const [selectedItems, selectItem] = useState<number[]>(defaultItems);

  const selectUnselect = useCallback((id: number) => {
    selectItem((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((_id) => _id !== id);
      }

      return [...prevItems, id];
    });
  }, []);

  return [selectedItems, selectUnselect];
};
