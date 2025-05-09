import { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce(query, 500);

  // Update internal state when initialValue changes
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#ff4081' }} />
          </InputAdornment>
        ),
        endAdornment: query && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear}>
              <ClearIcon sx={{ color: '#1976d2' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 3,
        fontFamily: "'Comic Neue', cursive",
        '& .MuiOutlinedInput-root': {
          borderRadius: '16px',
          backgroundColor: '#fff9c4',
          border: '2px solid #ff9800',
          boxShadow: '4px 4px 0 #000',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '6px 6px 0 #000',
          },
          '&.Mui-focused': {
            backgroundColor: '#fffde7',
            borderColor: '#f44336',
            transform: 'scale(1.04)',
          },
        },
        '& input': {
          fontFamily: "'Comic Neue', cursive",
        },
      }}
    />
  );
}