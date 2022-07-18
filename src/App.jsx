import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthPage } from './pages/AuthPage'
import { BasketPage } from './pages/BasketPage'
import { ProductsPage } from './pages/ProductsPage'

export const routes = {
  products: { path: '/', name: 'Товары', Component: ProductsPage },
  basket: { path: '/basket', name: 'Корзина', Component: BasketPage },
}

export const authRoutes = {
  signin: { path: '/auth/signin', name: 'Войти', Component: AuthPage },
  signup: {
    path: '/auth/signup',
    name: 'Зарегистрироваться',
    Component: AuthPage,
  },
  signout: { path: '/auth/signout', name: 'Выйти' },
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {Object.values(routes).map((route) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.Component />}
          />
        ))}
      </Route>
      {Object.values(authRoutes)
        .filter((route) => route.Component)
        .map((route) => (
          <Route
            path={route.path}
            key={route.name}
            element={<route.Component />}
          />
        ))}
    </Routes>
  )
}

export default App
