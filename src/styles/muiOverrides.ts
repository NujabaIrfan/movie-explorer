import { Components } from '@mui/material/styles/components';

export const componentOverrides: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        padding: '8px 16px'
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
      size: 'small'
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: 'none' // Remove gradient
      }
    }
  },
  MuiLink: {
    styleOverrides: {
      root: {
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  }
};