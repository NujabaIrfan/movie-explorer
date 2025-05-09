import { useState, useContext } from 'react'; // If you're using context
import { useAuth } from '../context/AuthContext';
import { Box, Container, Typography, TextField, Button, Link } from '@mui/material';
import Header from '../components/UI/Header'; // Import your existing header component
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Assuming you're managing dark mode here
  const [darkMode, setDarkMode] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials. Try "password" as password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(-45deg, #2196F3,rgb(218, 179, 165),rgb(138, 104, 164),rgb(87, 232, 206))',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite',
      '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
      }
    }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} /> {/* Pass props here */}

      <Container maxWidth="xs">
        <Box sx={{
          marginTop: 8, marginBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: 4, borderRadius: '15px', border: '3px solid #000',
          boxShadow: '5px 5px 0px #000', backdropFilter: 'blur(5px)'
        }}>
          <Typography component="h1" variant="h2" sx={{
            fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', fontWeight: 'bold', color: '#1976D2',
            textShadow: '2px 2px 0px #000', marginBottom: 3, textAlign: 'center'
          }}>
            SIGN IN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  border: '2px solid #000',
                  backgroundColor: '#fff',
                  '&:hover fieldset': { borderColor: '#1976D2' },
                  '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                },
                '& .MuiInputLabel-root': { fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', color: '#333' }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  border: '2px solid #000',
                  backgroundColor: '#fff',
                  '&:hover fieldset': { borderColor: '#1976D2' },
                  '&.Mui-focused fieldset': { borderColor: '#1976D2' },
                },
                '& .MuiInputLabel-root': { fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', color: '#333' }
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{
                mt: 1, fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
                backgroundColor: '#ffe6e6', padding: '5px 10px', borderRadius: '5px', border: '2px solid #000'
              }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{
              mt: 3, mb: 2, borderRadius: '10px', border: '2px solid #000', backgroundColor: '#1976D2',
              color: '#fff', fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', fontWeight: 'bold',
              textTransform: 'none', boxShadow: '3px 3px 0px #000', fontSize: '1.1rem', padding: '10px',
              '&:hover': { backgroundColor: '#1565C0', boxShadow: '5px 5px 0px #000', transform: 'translate(-2px, -2px)' },
              '&:active': { boxShadow: '2px 2px 0px #000', transform: 'translate(0px, 0px)' },
            }}>
              Sign In
            </Button>
            <Typography variant="body2" align="center" sx={{
              fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', color: '#333'
            }}>
              {"Don't have an account? "}
              <Link href="#" variant="body2" sx={{
                fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', color: '#1976D2', fontWeight: 'bold',
                textDecoration: 'underline', '&:hover': { color: '#0D47A1' },
              }}>
                Sign up (demo only)
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
