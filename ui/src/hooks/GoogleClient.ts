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
    async (spreadsheetId: string) => {
      try {
        setLoading(true);

        await googleSheet.setup(spreadsheetId);

        localStorage.setItem('spid', spreadsheetId.toString());

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
    setSetupRequired(true);
  }, []);

  useEffect(() => {
    console.log('logined', logined);

    if (logined) {
      const spreadsheetId = localStorage.getItem('spid');

      if (spreadsheetId === null || spreadsheetId === '') {
        return;
      }

      setup(spreadsheetId);
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
