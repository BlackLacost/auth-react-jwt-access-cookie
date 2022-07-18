import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { authRoutes, routes } from '../App'
import { useAuth } from '../features/Auth/useAuth'
import { fetchApi } from '../fetchApi'

export const AuthPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit } = useForm()
  const { isAuth, setTokenPayload } = useAuth()
  const [message, setMessage] = useState(null)

  const open = Boolean(message)
  const isSignin = location.pathname === authRoutes.signin.path

  const onSubmit = async (data) => {
    try {
      const res = await fetchApi.post(location.pathname, data)
      setMessage(null)
      localStorage.setItem('me', JSON.stringify(res.data.tokenPayload))
      setTokenPayload(res.data.tokenPayload)
    } catch (err) {
      console.log(err)
      setMessage(err.response.data.message)
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack p={4} spacing={2}>
            <Typography alignSelf="center" variant="h4" component="h1">
              {isSignin ? 'Вход' : 'Выйти'}
            </Typography>
            <Snackbar
              open={open}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={4000}
              onClose={() => setMessage(null)}
            >
              <Alert severity="error">{message}</Alert>
            </Snackbar>

            <TextField label="Почта" required {...register('email')} />
            {!isSignin && <TextField label="Имя" {...register('name')} />}
            <TextField
              required
              label="Пароль"
              type="password"
              {...register('password')}
            />
            <Stack direction="row" alignItems="center" spacing={3}>
              {isSignin ? (
                <>
                  <Typography>
                    Ещё нет аккаунта?{' '}
                    <Link to={authRoutes.signup.path}>Зарегистрируйтесь</Link>
                  </Typography>
                  <Button type="submit">{authRoutes.signin.name}</Button>
                </>
              ) : (
                <>
                  <Typography>
                    Уже есть аккаунт?{' '}
                    <Link to={authRoutes.signin.path}>Войдите</Link>
                  </Typography>
                  <Button type="submit">{authRoutes.signup.name}</Button>
                </>
              )}
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  )
}
