import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Link as RouterLink } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './features/Auth/AuthProvider'
import { queryClient } from './reactClient'

const theme = createTheme({
  components: {
    MuiLink: { defaultProps: { underline: 'hover', component: RouterLink } },
    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 4000,
      },
    },
    MuiMenuItem: { defaultProps: { component: RouterLink } },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
)
