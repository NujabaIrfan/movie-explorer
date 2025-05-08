import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

export default function Rating({ value, max = 10, size = 'medium' }: RatingProps) {
  const percentage = (value / max) * 100;
  const starSize = {
    small: 16,
    medium: 20,
    large: 24,
  }[size];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <StarIcon
        fontSize={size}
        sx={{
          color: (theme) => theme.palette.warning.main,
          width: starSize,
          height: starSize,
        }}
      />
      <Typography variant="body2" component="span">
        {value.toFixed(1)}/{max}
      </Typography>
      <Box
        sx={{
          width: `${percentage}%`,
          height: 4,
          bgcolor: (theme) => theme.palette.warning.main,
          borderRadius: 2,
          ml: 1,
        }}
      />
    </Box>
  );
}