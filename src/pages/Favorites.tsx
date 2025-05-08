import { useEffect, useState, useCallback } from 'react';
import { useMoviesApi } from '../hooks/useMoviesApi';
import { useMovies } from '../context/moviecontext';
import MovieGrid from '../components/movies/MovieGrid';
import { Box, Typography } from '@mui/material';
import Loading from '../components/Shared/Loading';
import ErrorMessage from '../components/Shared/ErrorMessage';
import { Movie } from '../types/movie';

export default function FavoritesPage() {
  const { favorites } = useMovies();
  const { getDetails } = useMoviesApi();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (favorites.length === 0) {
      setFavoriteMovies([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const moviePromises = favorites.map(async (id) => {
        const data = await getDetails(id);
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
  }, [favorites, getDetails]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

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