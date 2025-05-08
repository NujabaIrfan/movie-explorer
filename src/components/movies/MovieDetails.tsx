import { Box, Typography, Chip, Divider, Stack } from '@mui/material';
import { MovieDetails } from '../../types/movie';
import TrailerPlayer from './TrailerPlayer';

interface MovieDetailsProps {
  movie: MovieDetails;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function MovieDetailsComponent({ 
  movie, 
  isFavorite, 
  onToggleFavorite 
}: MovieDetailsProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        {movie.title}
        <Chip 
          label={isFavorite ? 'Favorited' : 'Add to Favorites'}
          color={isFavorite ? 'primary' : 'default'}
          onClick={onToggleFavorite}
          sx={{ ml: 2 }}
        />
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        {movie.release_date} • {movie.runtime} mins • ⭐ {movie.vote_average.toFixed(1)}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, my: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '30%' } }}>
          <img 
            src={
              movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/assets/placeholder-poster.jpg'
            }
            alt={movie.title}
            style={{ width: '100%', borderRadius: 4 }}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <TrailerPlayer movieId={movie.id} />
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}