import { Typography, Box } from '@mui/material';
import MovieCard from './MovieCard';
import { Movie } from '../../types/movie';
import Loading from '../Shared/Loading';
import ErrorMessage from '../Shared/ErrorMessage';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  loading?: boolean;
  error?: string | null;
}

export default function MovieGrid({ 
  movies, 
  title, 
  loading = false, 
  error = null 
}: MovieGridProps) {
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1">No movies found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        {movies.map((movie) => (
          <Box key={movie.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <MovieCard movie={movie} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
