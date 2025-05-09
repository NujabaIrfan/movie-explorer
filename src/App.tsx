import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Changed from HashRouter
import { lightTheme, darkTheme } from './theme';
import { MovieProvider } from './context/moviecontext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/UI/Layout';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';
import FavoritesPage from './pages/Favorites';
import LoginPage from './pages/Login';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <MovieProvider>
          <Router> {/* ✅ Now using BrowserRouter */}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}
              >
                <Route index element={<HomePage />} />
                <Route path="movie/:id" element={<MovieDetailsPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
              </Route>
            </Routes>
          </Router>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
