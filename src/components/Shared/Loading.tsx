import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1">Loading...</Typography>
    </Box>
  );
}