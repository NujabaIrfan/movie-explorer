import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Movie } from '../../types/movie';
import { useMovies } from '../../context/moviecontext';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

// Deterministically generate pastel color based on movie ID
const getPastelColorFromId = (id: number) => {
  const hue = id % 360;
  const saturation = 75;
  const lightness = 85;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite } = useMovies();
  const isFavorite = favorites.includes(movie.id);

  const rating = movie.vote_average ?? 0;
  const formattedRating = rating ? rating.toFixed(1) : 'N/A';

  const cardBackgroundColor = getPastelColorFromId(movie.id); // Stable color

  return (
    <Card
      sx={{
        maxWidth: 300,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        border: '3px solid #000',
        boxShadow: '6px 6px 0px #000',
        backgroundColor: cardBackgroundColor,
        color: '#222',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05) rotate(-1deg)',
          boxShadow: '8px 8px 0px #222',
        },
      }}
    >
      <Link
        to={`/movie/${movie.id}`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          sx={{
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            filter: 'contrast(1.1) saturate(1.3)',
            borderBottom: '3px solid #000',
            transition: 'filter 0.2s ease-in-out',
            '&:hover': {
              filter: 'contrast(1.2) saturate(1.4)',
            },
          }}
        />
        <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: '#111',
              textShadow: '2px 2px 0px #fff, 3px 3px 0px #000',
              fontFamily: "'Comic Neue', cursive",
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.9rem',
              color: '#555',
              fontFamily: "'Comic Neue', cursive",
            }}
          >
            {new Date(movie.release_date).getFullYear()} <span style={{ color: '#ffb300' }}>⭐</span> {formattedRating}
          </Typography>
        </CardContent>
      </Link>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie.id))}
          sx={{
            color: isFavorite ? '#ff4081' : '#424242',
            border: '2px solid #000',
            backgroundColor: '#fff',
            borderRadius: '50%',
            transition: 'transform 0.3s ease, background-color 0.2s',
            '&:hover': {
              transform: 'rotate(-10deg) scale(1.2)',
              backgroundColor: '#ffe0e0',
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
