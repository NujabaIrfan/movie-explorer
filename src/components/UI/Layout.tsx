import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface LayoutProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function Layout({ darkMode, setDarkMode }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    console.log('Route changed:', location.pathname);
  }, [location]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <Container
        component="main"
        maxWidth={false} // makes it full width
        disableGutters // removes default left/right padding
        sx={{
          py: 3, // vertical padding
          px: { xs: 2, sm: 4, md: 6 }, // responsive horizontal padding
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}
