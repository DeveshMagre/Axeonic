import { Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};