import { AppBar, Button, Container, Link, Toolbar } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { authRoutes, routes } from '../../App'
import { AuthMenu } from '../../features/Auth/AuthMenu'
import { useAuth } from '../../features/Auth/useAuth'

export const Header = () => {
  const { isAuth } = useAuth()
  return (
    <AppBar color="default" position="sticky">
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to={routes.products.path} color="text.primary">
            {routes.products.name}
          </Link>
          {isAuth() ? (
            <AuthMenu />
          ) : (
            <Button to={authRoutes.signin.path} component={RouterLink}>
              {authRoutes.signin.name}
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
