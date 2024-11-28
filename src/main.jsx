import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'
import App from './App.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0b144e',
      light: "#3B4371",
    },
    secondary: {
      main: '#f50057',
      white: "#FFFFFF",
    },
  },
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
          <CssBaseline/>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
