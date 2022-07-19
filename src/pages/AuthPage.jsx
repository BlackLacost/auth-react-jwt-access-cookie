import { Alert, Box, Paper, Snackbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authRoutes, routes } from '../App'
import { SigninForm } from '../features/Auth/SigninForm'
import { SignupForm } from '../features/Auth/SignupForm'
import { useAuth } from '../features/Auth/useAuth'

export const AuthPage = () => {
  const { isAuth, setTokenPayload } = useAuth()
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const open = Boolean(message)
  const isSignup = location.pathname === authRoutes.signup.path

  useEffect(() => {
    if (isAuth()) {
      navigate(location.state?.from || routes.products.path)
    }
  }, [isAuth, location.state?.from, navigate])

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
      }}
    >
      <Paper>
        {isSignup ? (
          <SignupForm
            setMessage={setMessage}
            setTokenPayload={setTokenPayload}
          />
        ) : (
          <SigninForm
            setMessage={setMessage}
            setTokenPayload={setTokenPayload}
          />
        )}
        <Snackbar open={open} onClose={() => setMessage(null)}>
          <Alert severity="error">{message}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  )
}
