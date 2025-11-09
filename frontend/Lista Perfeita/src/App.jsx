import { ThemeProvider } from '@emotion/react'
import './App.css'
import AppRoutes from './routes/AppRoutes'
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
