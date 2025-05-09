import { useEffect, useState, useCallback, useMemo } from 'react';
import { useMoviesApi } from '../hooks/useMoviesApi';
import { useMovies } from '../context/moviecontext';
import MovieGrid from '../components/movies/MovieGrid';
import { Box, Typography } from '@mui/material';
import Loading from '../components/Shared/Loading';
import ErrorMessage from '../components/Shared/ErrorMessage';
import { Movie } from '../types/movie';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function FavoritesPage() {
  const { favorites } = useMovies();
  const { getDetails } = useMoviesApi();
  const { user } = useAuth();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the getDetails function to prevent unnecessary changes
  const stableGetDetails = useCallback(getDetails, []);

  // Memoize favorites array to prevent unnecessary changes
  const memoizedFavorites = useMemo(() => favorites, [JSON.stringify(favorites)]);

  const fetchFavorites = useCallback(async () => {
    if (memoizedFavorites.length === 0) {
      setFavoriteMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const moviePromises = memoizedFavorites.map(async (id) => {
        const data = await stableGetDetails(id);
        if (!data) return null;

        return {
          id: data.id,
          title: data.title || 'Unknown Title',
          poster_path: data.poster_path || null,
          release_date: data.release_date || '',
          vote_average: data.vote_average || 0
        };
      });

      const movies = await Promise.all(moviePromises);
      const validMovies = movies.filter((movie): movie is Movie => movie !== null);
      setFavoriteMovies(validMovies);
    } catch (err) {
      setError('Failed to load favorite movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [memoizedFavorites, stableGetDetails]);

  useEffect(() => {
    // Only fetch if favorites have actually changed
    const favoriteIds = favoriteMovies.map(movie => movie.id).sort();
    const currentIds = memoizedFavorites.sort();
    
    if (JSON.stringify(favoriteIds) !== JSON.stringify(currentIds)) {
      fetchFavorites();
    }
  }, [memoizedFavorites, favoriteMovies, fetchFavorites]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (loading && favoriteMovies.length === 0) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Movies
      </Typography>
      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <Typography variant="body1">
          {loading ? 'Loading...' : 'You haven\'t added any favorites yet. Start by clicking the ♡ icon on movies!'}
        </Typography>
      )}
    </Box>
  );
}