import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { getMovieDetails } from '../../services/tmdb';

interface TrailerPlayerProps {
  movieId: number;
}

export default function TrailerPlayer({ movieId }: TrailerPlayerProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const movieDetails = await getMovieDetails(movieId);
        const trailers = movieDetails.videos?.results || [];
        
        // Find the first official YouTube trailer
        const trailer = trailers.find(
          (video: any) => 
            video.site === 'YouTube' && 
            video.type === 'Trailer' &&
            video.official
        );

        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error('Failed to fetch trailer:', err);
        setError('Failed to load trailer');
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (loading) return null; // Or return a loading spinner
  if (error) return null; // Or return an error message
  if (!trailerKey) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Trailer
      </Typography>
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: 1,
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
          title={`${movieId} Trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Box>
  );
}