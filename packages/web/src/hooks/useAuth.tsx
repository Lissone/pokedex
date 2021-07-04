import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
import { setCookie, parseCookies } from 'nookies'
import jwt from 'jsonwebtoken'
import Router from 'next/router'

import { api } from '../services/api'

import { Pokemon } from '../components/PokemonCard'

interface SignInData {
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

      const tokeExpire = new Date(exp * 1000)

      await setCookie(undefined, '@Pokedex/token', data.token, {
        expires: tokeExpire
      })

      setUser(data.user)

      Router.push('home')
    } catch (err) {
      throw new Error(err)
    }
  }

  async function signOut() {
    // limpar cookie e limpar user
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        signInWithEmailPassword,
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
