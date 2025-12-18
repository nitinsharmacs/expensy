import GoogleClient from '@/models/GoogleClient';
import GoogleSheet from '@/services/GoogleSheet';
import { APIError } from '@/Types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useGoogleSheet = (
  logined: boolean,
  client: GoogleClient,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [error, setError] = useState<APIError>({ message: '', isValid: false });
  const [isSuccess, setIsSuccess] = useState(false);
  const [setup_required, setSetupRequired] = useState(true);

  const googleSheet = useMemo(() => new GoogleSheet(client), [client]);

  const setup = useCallback(
    async (spreadsheetId: string, sheetId: string) => {
      try {
        setLoading(true);

        await googleSheet.setup(spreadsheetId, sheetId);

        localStorage.setItem('spid', spreadsheetId.toString());
        localStorage.setItem('sheetid', sheetId.toString());

        setLoading(false);
        setIsSuccess(true);
        setSetupRequired(false);
      } catch (error) {
        setLoading(false);
        setError({
          message: 'Could not connect Google Services. Try again.',
          isValid: true,
        });
        setSetupRequired(true);
      }
    },
    [googleSheet, setLoading]
  );

  const reset = useCallback(() => {
    localStorage.removeItem('spid');
    localStorage.removeItem('sheetid');
    setSetupRequired(true);
  }, []);

  useEffect(() => {
    if (logined) {
      const spreadsheetId = localStorage.getItem('spid');
      const sheetId = localStorage.getItem('sheetid');

      if (spreadsheetId === null || spreadsheetId === '') {
        return;
      }

      if (sheetId === null || sheetId === '') {
        return;
      }

      setup(spreadsheetId, sheetId);
    }
  }, [setup, logined]);

  return {
    error,
    isSuccess,
    setup_required,
    client: googleSheet,
    setupClient: setup,
    resetClient: reset,
  };
};
