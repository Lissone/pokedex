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
import { firebase, auth } from '../services/firebase'

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
  pokemonStarred?: Pokemon
  pokemonsLiked?: Pokemon[]
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  signInWithEmailPassword: (data: SignInData) => Promise<void>
  signInWithGoogle: () => Promise<void>
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
  const [googleUser, setGoogleUser] = useState<SignUpData>(null)

  useEffect(() => {
    const { '@Pokedex/token': token } = parseCookies()

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`

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

  async function signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()

      const result = await auth.signInWithPopup(provider)

      if (result.user) {
        const { displayName, email, uid } = result.user

        if (!displayName) {
          throw new Error('Missing information from Google Account')
        }

        setGoogleUser({
          name: displayName,
          email,
          password: uid
        })

        await signInWithEmailPassword({ email, password: uid })
      }
    } catch (err) {
      err.name = ''

      if (err.toString() === 'Usuário não esta cadastrado') {
        await signUp(googleUser)
        return
      }

      throw new Error(err)
    }
  }

  async function signOut() {
    await destroyCookie(undefined, '@Pokedex/token')
    localStorage.removeItem('@Pokedex:pokemons')

    setUser(null)

    Router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signInWithEmailPassword,
        signInWithGoogle,
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
