import { useEffect, useState } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useMoviesApi } from '../hooks/useMoviesApi';
import MovieDetailsComponent from '../components/movies/MovieDetails';
import { useMovies } from '../context/moviecontext';
import ErrorMessage from '../components/Shared/ErrorMessage';
import { MovieDetails } from '../types/movie';
import { useAuth } from '../context/AuthContext';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { getDetails } = useMoviesApi();
  const { user } = useAuth();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite } = useMovies();

  // Always call hooks unconditionally
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    setMovie(null);
    setError(null);
  }, [id]);

  useEffect(() => {
    if (!id || !user) {
      setError('Invalid movie ID or user not logged in');
      return;
    }

    const loadMovieDetails = async () => {
      try {
        const data = await getDetails(Number(id));
        if (!data) throw new Error('Movie data not available');

        setMovie({
          id: data.id,
          title: data.title || 'Untitled Movie',
          poster_path: data.poster_path,
          release_date: data.release_date || '',
          vote_average: data.vote_average || 0,
          overview: data.overview || '',
          runtime: data.runtime || 0,
          genres: data.genres || [],
          videos: {
            results: data.videos?.results?.filter((v: any) => v.site === 'YouTube') || []
          },
          credits: {
            cast: data.credits?.cast || []
          }
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load movie details');
      }
    };

    loadMovieDetails();
  }, [id, user, getDetails]);

  // Only do conditional rendering AFTER hooks
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!movie && !error) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress size={60} />
    </Box>
  );

  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found" />;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      <MovieDetailsComponent
        movie={movie}
        isFavorite={favorites.includes(movie.id)}
        onToggleFavorite={() =>
          favorites.includes(movie.id)
            ? removeFavorite(movie.id)
            : addFavorite(movie.id)
        }
      />
    </Box>
  );
}
