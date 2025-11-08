import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';

function App() {

  return (
    <>

      <ThemeProvider theme={theme}>

        <AppRoutes />

      </ThemeProvider>
    </>
  )
}

export default App
