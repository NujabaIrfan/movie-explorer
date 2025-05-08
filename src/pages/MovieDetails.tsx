import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Chip, Divider, Stack, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMoviesApi } from '../hooks/useMoviesApi';
import { useMovies } from '../context/moviecontext';
import { MovieDetails, Movie } from '../types/movie';

interface RelatedMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getDetails, getSimilarMovies } = useMoviesApi();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<RelatedMovie[]>([]);
  const { favorites, addFavorite, removeFavorite } = useMovies();

  // Load movie details and related movies
  useEffect(() => {
    if (!id) {
      setError('Invalid movie ID');
      return;
    }

    const loadData = async () => {
      try {
        // Load main movie details
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

        // Load related movies
        const similarData = await getSimilarMovies(Number(id), 1);
        setRelatedMovies(
          similarData.results.map((m: Movie) => ({
            id: m.id,
            title: m.title,
            poster_path: m.poster_path
          }))
        );
      } catch (err) {
        console.error(err);
        setError('Failed to load movie data');
      }
    };

    loadData();
  }, [id, getDetails, getSimilarMovies]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return null; // Or a skeleton loader

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      {/* Main Movie Details */}
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
          </Typography>
          <IconButton 
            onClick={() => favorites.includes(movie.id) ? removeFavorite(movie.id) : addFavorite(movie.id)}
            color="error"
            size="large"
          >
            {favorites.includes(movie.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        
        <Typography variant="subtitle1" gutterBottom>
          {movie.release_date} • {movie.runtime} mins • ⭐ {movie.vote_average.toFixed(1)}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, my: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ width: { xs: '100%', md: '30%' } }}>
            <img 
              src={
                movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/placeholder-poster.jpg'
              }
              alt={movie.title}
              style={{ width: '100%', borderRadius: 4 }}
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '70%' } }}>
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

      {/* Related Movies Section */}
      {relatedMovies.length > 0 && (
        <Box component="section" sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, px: 2 }}>
            You May Also Like
          </Typography>
          
          <Box sx={{ 
            overflowX: 'auto',
            pb: 3,
            px: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' }
          }}>
            <Box sx={{ display: 'inline-flex', gap: 3 }}>
              {relatedMovies.map((relatedMovie) => (
                <Box 
                  key={relatedMovie.id}
                  onClick={() => handleMovieClick(relatedMovie.id)}
                  sx={{ 
                    flexShrink: 0,
                    width: 180,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    height: '100%'
                  }}>
                    <Box
                      component="img"
                      src={
                        relatedMovie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}`
                          : '/placeholder-movie.png'
                      }
                      alt={relatedMovie.title}
                      sx={{ 
                        width: '100%',
                        height: 270,
                        objectFit: 'cover'
                      }}
                      loading="lazy"
                    />
                    <Box sx={{ p: 1.5, width: '100%' }}>
                      <Typography variant="subtitle2" sx={{ 
                        textAlign: 'center',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {relatedMovie.title}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}