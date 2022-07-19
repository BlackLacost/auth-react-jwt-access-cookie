import { createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { routes } from '../../App'
import { fetchApi } from '../../fetchApi'

export const AuthContext = createContext()

const initialTokenPayload = {
  sub: null,
  email: null,
  name: null,
  role: null,
  iat: null,
  exp: null,
}

export const AuthProvider = ({ children }) => {
  const me = JSON.parse(localStorage.getItem('me')) || initialTokenPayload
  const [tokenPayload, setTokenPayload] = useState(me)

  useEffect(() => {
    const me = async () => {
      const res = await fetchApi.get('auth/me')
      if (res.status === 200) {
        localStorage.setItem('me', JSON.stringify(res.data.tokenPayload))
        setTokenPayload(res.data.tokenPayload)
      }
    }
    me()
  }, [])

  const isAuth = () => new Date().getTime() / 1000 < tokenPayload.exp

  const signout = async () => {
    await fetchApi.delete('auth/signout')
    localStorage.setItem('me', JSON.stringify(initialTokenPayload))
    setTokenPayload(initialTokenPayload)
    return <Navigate to={routes.products.path} />
  }

  return (
    <AuthContext.Provider
      value={{
        tokenPayload,
        setTokenPayload,
        isAuth,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
