// In Layout.tsx
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
    // This will trigger when route changes
    console.log('Route changed:', location.pathname);
  }, [location]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container component="main" sx={{ py: 3, flexGrow: 1 }}>
        <Outlet key={location.pathname} /> {/* ← Add key here */}
      </Container>
      <Footer />
    </Box>
  );
}