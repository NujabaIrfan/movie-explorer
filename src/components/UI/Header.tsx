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
    <AppBar
      position="static"
      sx={{
        background: darkMode ? 'linear-gradient(45deg, #2c3e50, #34495e)' : 'linear-gradient(45deg, #3498db, #2980b9)', // Gradient background for extra flair
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.4)', // Heavier shadow for more depth
        borderBottom: `6px solid ${darkMode ? '#34495e' : '#2980b9'}`, // Thicker border for a stronger effect
        padding: '20px 0', // Added padding for a thicker header
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "'Comic Neue', cursive",
            fontWeight: 'bold',
            fontSize: '2rem', // Increased font size for more emphasis
            textShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)', // Stronger and more exaggerated cartoonish text shadow
            color: darkMode ? '#ecf0f1' : '#ffffff', // Lighter text color to contrast with the background
            letterSpacing: '2px', // Slightly spaced out letters for more playful feel
          }}
        >
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
            sx={{
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(52, 73, 94, 0.8)' : 'rgba(41, 128, 185, 0.8)',
                transform: 'scale(1.3)', // Larger zoom effect on hover
                transition: 'all 0.3s ease-in-out',
              },
            }}
          >
            <FavoriteIcon sx={{ fontSize: '40px', color: darkMode ? '#ecf0f1' : '#ffffff' }} />
          </IconButton>

          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

          {user ? (
            <Button
              color="inherit"
              onClick={logout}
              sx={{
                fontFamily: "'Comic Neue', cursive",
                fontWeight: 'bold',
                fontSize: '1.2rem', // Slightly larger for emphasis
                textTransform: 'none',
                letterSpacing: '1px',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(52, 73, 94, 0.8)' : 'rgba(41, 128, 185, 0.8)',
                  transform: 'scale(1.2)', // Slight zoom effect
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                fontFamily: "'Comic Neue', cursive",
                fontWeight: 'bold',
                fontSize: '1.2rem',
                textTransform: 'none',
                letterSpacing: '1px',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(52, 73, 94, 0.8)' : 'rgba(41, 128, 185, 0.8)',
                  transform: 'scale(1.2)', // Slight zoom effect
                  transition: 'all 0.3s ease-in-out',
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
