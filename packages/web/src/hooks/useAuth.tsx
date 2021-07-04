import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import jwt from 'jsonwebtoken'
import Router from 'next/router'

import { api } from '../services/api'

import { Pokemon } from '../components/PokemonCard'

interface SignInData {
  email: string
  password: string
}

interface SignUpData {
  name: string
  email: string
  password: string
}

export interface User {
  uid: string
  name: string
  email: string
  password: string
  createdAt: string
  pokemonsLiked?: Pokemon[] | null
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  signInWithEmailPassword: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@Pokedex/token': token } = parseCookies()

    if (token) {
      api.get('/user/recover').then(({ data }) => setUser(data.user))
    }
  }, [])

  async function signInWithEmailPassword({ email, password }: SignInData) {
    try {
      const { data } = await api.post('/user/authenticate', {
        email,
        password
      })

      api.defaults.headers.authorization = `Bearer ${data.token}`

      const { exp } = await jwt.verify(data.token, secretKey)

      const tokenExpire = new Date(exp * 1000)

      await setCookie(undefined, '@Pokedex/token', data.token, {
        expires: tokenExpire
      })

      setUser(data.user)

      Router.push('/home')
    } catch (err) {
      switch (err.response.data.message) {
        case 'User not found':
          throw new Error('Usuário não esta cadastrado')
        case 'Invalid password':
          throw new Error('Senha inválida')
        default:
          throw new Error(err)
      }
    }
  }

  async function signUp(userSignUp: SignUpData) {
    try {
      const { data } = await api.post('/user/register', userSignUp)

      api.defaults.headers.authorization = `Bearer ${data.token}`

      const { exp } = await jwt.verify(data.token, secretKey)

      const tokenExpire = new Date(exp * 1000)

      await setCookie(undefined, '@Pokedex/token', data.token, {
        expires: tokenExpire
      })

      setUser(data.user)

      Router.push('/home')
    } catch (err) {
      switch (err.response.data.message) {
        case 'User is already registered':
          Router.push('/')
          throw new Error('Usuário já está cadastrado')
        default:
          throw new Error(err)
      }
    }
  }

  async function signOut() {
    await destroyCookie(undefined, '@Pokedex/token')

    setUser(null)

    Router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        signInWithEmailPassword,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
