import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';
import {UsersPage }from './pages/UsersPage';
import {UserDetailPage} from './pages/UserDetailPage';
import { useTheme } from './context/ThemeContext';
function App() {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserDetailPage />} />
          </Routes>
        </BrowserRouter>
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}

const MuiThemeWrapper = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#ffffff',
        paper: isDarkMode ? '#1e1e1e' : '#f5f5f5',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
          },
        },
      },
    },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default App;