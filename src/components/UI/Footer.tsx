import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="https://yourwebsite.com/">
          Movie Explorer
        </Link>{' '}
        {new Date().getFullYear()}
        {'. Data provided by '}
        <Link color="inherit" href="https://www.themoviedb.org/">
          TMDb
        </Link>
        {'.'}
      </Typography>
    </Box>
  );
}