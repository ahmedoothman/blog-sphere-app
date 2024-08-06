import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom MUI theme
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#34495e',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#ecf0f1',
    },
  },
});

export default theme;
