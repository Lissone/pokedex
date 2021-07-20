import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
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

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

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

      setCookie(undefined, '@Pokedex/token', data.token, {
        maxAge: data.tokenExpires
      })

      setUser(data.user)
      localStorage.removeItem('@Pokedex:pokemons')

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

      setCookie(undefined, '@Pokedex/token', data.token, {
        maxAge: data.tokenExpire
      })

      setUser(data.user)
      localStorage.removeItem('@Pokedex:pokemons')

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

        signInWithEmailPassword({ email, password: uid }).catch(ret => {
          ret.name = ''

          if (ret.toString() === 'Usuário não esta cadastrado') {
            signUp({
              name: displayName,
              email,
              password: uid
            })
          }
        })
      }
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
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
