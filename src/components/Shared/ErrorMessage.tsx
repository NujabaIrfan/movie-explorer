import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
}

export default function ErrorMessage({
  message,
  severity = 'error',
  onClose,
}: ErrorMessageProps) {
  return (
    <Alert severity={severity} onClose={onClose} sx={{ mb: 2 }}>
      <AlertTitle>{severity.charAt(0).toUpperCase() + severity.slice(1)}</AlertTitle>
      {message}
    </Alert>
  );
}