import { Link, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { authRoutes } from '../App'
import { useAuth } from '../features/Auth/useAuth'

export const BasketPage = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const locaiton = useLocation()

  if (!isAuth()) {
    return (
      <Typography>
        Чтобы добавить товар в корзину, нужно{' '}
        <Link
          to={authRoutes.signin.path}
          onClick={(e) => {
            e.preventDefault()
            navigate(authRoutes.signin.path, {
              state: { from: locaiton.pathname },
            })
          }}
        >
          {authRoutes.signin.name}
        </Link>
      </Typography>
    )
  }

  return (
    <>
      <Typography>Коризна</Typography>
    </>
  )
}
