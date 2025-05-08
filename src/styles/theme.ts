import { createTheme, ThemeOptions } from '@mui/material/styles';

// Base theme options (typed correctly)
const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    button: { textTransform: 'none' }
  },
  shape: { borderRadius: 8 },
  spacing: 8
};

// Create themes from base options
export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: '#f5f5f5', paper: '#ffffff' }
  }
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' }
  }
});

// Correct AppTheme typing from actual theme
export type AppTheme = typeof lightTheme;
