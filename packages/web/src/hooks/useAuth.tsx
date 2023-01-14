/* eslint-disable import/no-cycle */
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import React, { createContext, ReactNode, useContext, useState, useEffect, useMemo, useCallback } from 'react'

import { api } from '@services/api'
import { firebase, auth } from '@services/firebase'

import { Pokemon } from './usePokemons'

// -------------------------------------------------------------------

export interface User {
  readonly uid: string
  readonly name: string
  readonly email: string
  readonly password: string
  readonly createdAt: string
  readonly pokemonStarred?: Pokemon
  readonly pokemonsLiked?: Pokemon[]
}

interface SignInData {
  readonly email: string
  readonly password: string
}

interface SignUpData {
  readonly name: string
  readonly email: string
  readonly password: string
}

interface AuthContextType {
  readonly user: User | null
  readonly setUser: (user: User | null) => void
  readonly signInWithEmailPassword: (data: SignInData) => Promise<void>
  readonly signInWithGoogle: () => Promise<void>
  readonly signUp: (data: SignUpData) => Promise<void>
  readonly signOut: () => void
}

interface AuthContextProviderProps {
  readonly children: ReactNode
}

// -------------------------------------------------------------------

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { '@Pokedex/token': token } = parseCookies()

    if (token) {
      api.get('/user/recover').then(({ data }) => setUser(data.user))
      api.defaults.headers.authorization = `Bearer ${token}`
    }
  }, [])

  // ------------------------------

  const signInWithEmailPassword = useCallback(async ({ email, password }: SignInData) => {
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
    } catch (err: any) {
      if (err.response.data.message) {
        throw new Error(err.response.data.message)
      }
      throw new Error(err)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await auth.signInWithPopup(provider)

      if (result.user) {
        const { displayName, email, uid } = result.user

        if (!displayName) {
          throw new Error('Informações da sua conta Google não suficientes para criar sua Pokedex!')
        }

        signInWithEmailPassword({ email, password: uid }).catch((ret) => {
          ret.name = ''
          throw new Error(ret.toString())
        })
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') return
      throw new Error(err)
    }
  }, [signInWithEmailPassword])

  // ------------------------------

  const signUp = useCallback(async (userSignUp: SignUpData) => {
    try {
      const { data } = await api.post('/user/register', userSignUp)

      api.defaults.headers.authorization = `Bearer ${data.token}`

      setCookie(undefined, '@Pokedex/token', data.token, {
        maxAge: data.tokenExpire
      })

      setUser(data.user)
      localStorage.removeItem('@Pokedex:pokemons')

      Router.push('/home')
    } catch (err: any) {
      if (err.response.data.message) {
        Router.push('/')
        throw new Error(err.response.data.message)
      }
      throw new Error(err)
    }
  }, [])

  // ------------------------------

  const signOut = () => {
    destroyCookie(undefined, '@Pokedex/token')
    localStorage.removeItem('@Pokedex:pokemons')
    setUser(null)

    Router.push('/')
  }

  // ------------------------------

  const contextValues = useMemo(
    () => ({
      user,
      setUser,
      signInWithEmailPassword,
      signInWithGoogle,
      signUp,
      signOut
    }),
    [signInWithEmailPassword, signInWithGoogle, signUp, user]
  )

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
