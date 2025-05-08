import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Movie Explorer
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            component={Link}
            to="/favorites"
            color="inherit"
            aria-label="favorites"
          >
            <FavoriteIcon />
          </IconButton>
          
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          
          {user ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}