import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        color="inherit"
        aria-label="toggle theme"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}