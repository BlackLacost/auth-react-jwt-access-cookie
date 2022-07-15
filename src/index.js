import { CssBaseline } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import { queryClient } from './reactClient'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
