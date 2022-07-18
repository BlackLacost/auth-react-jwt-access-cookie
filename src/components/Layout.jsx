import { Container } from '@mui/system'
import { Outlet } from 'react-router-dom'
import { Header } from './Header/index'

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}
