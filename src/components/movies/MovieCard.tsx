import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Movie } from '../../types/movie';
import { useMovies } from '../../context/moviecontext';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite } = useMovies();
  const isFavorite = favorites.includes(movie.id);

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}> {/* Link to movie details */}
        <CardMedia
          component="img"
          height="140"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average.toFixed(1)}
          </Typography>
        </CardContent>
      </Link>

      <IconButton
        aria-label="add to favorites"
        onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie.id)}
      >
        <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
      </IconButton>
    </Card>
  );
}
