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
    <Box
      sx={{
        p: 3,
        fontFamily: "'Comic Neue', cursive",
        backgroundColor: '#fff8dc',
        border: '3px solid #000',
        borderRadius: '20px',
        boxShadow: '6px 6px 0px #000',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontFamily: "'Comic Neue', cursive", color: '#d84315' }}>
        {movie.title}
        <Chip
          label={isFavorite ? '💖 Favorited' : '➕ Add to Favorites'}
          color={isFavorite ? 'primary' : 'default'}
          onClick={onToggleFavorite}
          sx={{
            ml: 2,
            fontWeight: 'bold',
            fontFamily: "'Comic Neue', cursive",
            border: '2px solid #000',
            boxShadow: '2px 2px 0px #000',
            borderRadius: '12px',
            backgroundColor: isFavorite ? '#ffe082' : '#f5f5f5',
          }}
        />
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ color: '#5d4037' }}>
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
            style={{
              width: '100%',
              borderRadius: '16px',
              border: '3px solid #000',
              boxShadow: '5px 5px 0px #000',
            }}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '70%' } }}>
          <TrailerPlayer movieId={movie.id} />
          <Typography variant="body1" paragraph sx={{ mt: 2, fontFamily: "'Comic Neue', cursive" }}>
            {movie.overview}
          </Typography>
          <Divider sx={{ my: 2, borderColor: '#000' }} />
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            {movie.genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{
                  fontFamily: "'Comic Neue', cursive",
                  fontWeight: 'bold',
                  backgroundColor: '#ffcc80',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0px #000',
                  borderRadius: '10px',
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
