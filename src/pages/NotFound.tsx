import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: 2
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: '4rem', fontWeight: 700 }}>
        404
      </Typography>
      <Typography variant="h4" component="h2">
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button component={Link} to="/" variant="contained" size="large">
        Go to Home
      </Button>
    </Box>
  );
}