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
  return (
    <Box sx={{ mt: 4 }}>
      {title && (
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            mb: 3,
            fontFamily: "'Comic Neue', cursive",
            color: '#222',
            textShadow: '2px 2px 0 #fff, 3px 3px 0 #000',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
      )}
      
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (!movies || movies.length === 0) ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" sx={{ fontFamily: "'Comic Neue', cursive" }}>
            No movies found
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
              xl: 'repeat(5, 1fr)',
            },
            gap: 3,
            px: 1,
            animation: 'pop-in 0.6s ease-out',
          }}
        >
          {movies?.map((movie) => (
            <Box
              key={movie.id}
              sx={{
                animation: 'bounceIn 0.4s ease-out',
                '@keyframes bounceIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'scale(0.9) translateY(20px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'scale(1) translateY(0)',
                  },
                },
              }}
            >
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
