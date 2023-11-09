import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useState } from 'react';

const ToastCard = ({
  message,
  severity,
}: {
  message: string;
  severity: AlertColor;
}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastCard;
