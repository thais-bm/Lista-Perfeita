// theme.jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    rosa: {
      main: '#ea33bd',   // cor principal
      dark: '#ad30e7',   // variação mais escura
      light: '#f48fb1',  // variação mais clara
      contrastText: '#fff'
    },

    grey: {
      main: '#6e6e6e',
      dark: '#4a4a4a',
      light: '#9e9e9e',
      contrastText: '#fff'
    },
  },
});

export default theme;