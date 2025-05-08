import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import { MovieProvider } from './context/moviecontext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/UI/Layout';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';
import FavoritesPage from './pages/Favorites';
import LoginPage from './pages/Login';

function AppRoutes({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (mode: boolean) => void }) {
  const location = useLocation(); // Correct way to get location
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
        <Route index element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <MovieProvider>
          <Router>
            <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
          </Router>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;