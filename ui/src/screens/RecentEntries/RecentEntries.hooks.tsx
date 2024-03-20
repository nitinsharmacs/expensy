import { useCallback, useEffect, useState } from 'react';
import { RecentEntryItemProps } from '../../components/RecentEntryItem/RecentEntryItem';
import CashflowAPIService from '../../services/CashflowAPIService';

import { APIError } from '../../Types';
import BufferedRequest from '../../services/BufferedRequest';

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
      setEntries(recentEntries.reverse());
    };

    if (open) getRecentEntries();
  }, [open]);

  return [entries, loading];
};

export const useSelectItem = (
  defaultItems: number[]
): [number[], (id: number) => void, () => void] => {
  const [selectedItems, selectItem] = useState<number[]>(defaultItems);

  const selectUnselect = useCallback((id: number) => {
    selectItem((prevItems) => {
      if (prevItems.includes(id)) {
        return prevItems.filter((_id) => _id !== id);
      }

      return [...prevItems, id];
    });
  }, []);

  const clear = useCallback(() => {
    selectItem([]);
  }, []);

  return [selectedItems, selectUnselect, clear];
};

export const useDeleteItems = (): [
  boolean,
  boolean,
  APIError,
  (ids: number[]) => Promise<void>
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<APIError>({ message: '', isValid: false });
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteItems = useCallback(async (ids: number[]) => {
    try {
      setLoading(true);
      await BufferedRequest.submit(() => CashflowAPIService.deleteEntries(ids));
      setIsSuccess(true);
    } catch (error) {
      setError({ isValid: true, message: 'Items deletion failed' });
    } finally {
      setLoading(false);
      setError({ message: '', isValid: false });
    }
  }, []);

  return [loading, isSuccess, error, deleteItems];
};
