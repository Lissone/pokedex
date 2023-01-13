/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { createContext, ReactNode, useContext, useState, useCallback, useMemo } from 'react'

import { api } from '@services/api'

import { useAuth, User } from './useAuth'

// -------------------------------------------------------------------

export interface Pokemon {
  readonly id: number
  readonly name: string
  readonly photo: string
  readonly height: number
  readonly weight: number
  readonly isLiked: boolean
  readonly isStarred: boolean
  readonly types: string[]
  readonly abilities: string[]
  readonly evolutions: Pokemon[]
}

interface PokemonContextType {
  readonly pokemons: Pokemon[]
  readonly page: string
  readonly getPokemons: () => Promise<void>
  readonly handleLike: (pokemon: Pokemon, user?: User) => void
  readonly handleStar: (pokemon: Pokemon) => void
}

interface PokemonContextProviderProps {
  readonly children: ReactNode
}

// -------------------------------------------------------------------

export const PokemonsContext = createContext({} as PokemonContextType)

export function PokemonsProvider({ children }: PokemonContextProviderProps) {
  const { user, setUser } = useAuth()

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [page, setPage] = useState('?offset=0&limit=20')

  // ------------------------------

  async function savePokemonsStorage(nextPage: string, data: Pokemon[]) {
    setPage(nextPage)
    setPokemons(data)

    localStorage.setItem('@Pokedex:pokemons', JSON.stringify({ nextPage, pokemons: data }))
  }

  // ------------------------------

  const getPokemons = useCallback(async () => {
    try {
      if (pokemons.length === 0) {
        const listPokemonsStoraged = localStorage.getItem('@Pokedex:pokemons')
        if (listPokemonsStoraged) {
          const pokemonsStoragedParsed = JSON.parse(listPokemonsStoraged)
          setPage(pokemonsStoragedParsed.nextPage)
          setPokemons(pokemonsStoragedParsed.pokemons)
          return
        }
      }

      const { data } = await api.get(`/pokemon/${page}`)
      savePokemonsStorage(data.nextPage, [...pokemons, ...data.pokemons])
    } catch (err: any) {
      console.error(err.message)
    }
  }, [page, pokemons])

  // ------------------------------

  const handleLike = useCallback(
    (pokemon: Pokemon, userData?: User) => {
      if (!user) return

      const pokemonsUpdated = pokemons.map((item) =>
        item.id === pokemon.id ? { ...item, isLiked: !pokemon.isLiked } : item
      )

      let userUpdated: User
      if (!userData) {
        const pokemonUpdated = pokemonsUpdated.filter((item) => item.id === pokemon.id)

        userUpdated = {
          uid: user.uid,
          name: user.name,
          email: user.email,
          password: user.password,
          createdAt: user.createdAt,
          pokemonStarred: user.pokemonStarred,
          pokemonsLiked: pokemonUpdated[0].isLiked
            ? [...user.pokemonsLiked, pokemonUpdated[0]]
            : user.pokemonsLiked.filter((pokemonLiked) => pokemonLiked.id !== pokemonUpdated[0].id)
        }
      } else {
        userUpdated = {
          ...userData,
          pokemonsLiked: user.pokemonsLiked.filter((item) => item.id !== pokemon.id)
        }
      }

      savePokemonsStorage(page, pokemonsUpdated)

      api.put('/user/', { user: userUpdated }).then(({ data }) => setUser(data.user))
    },
    [page, pokemons, setUser, user]
  )

  const handleStar = useCallback(
    (pokemon: Pokemon) => {
      const pokemonUpdated = {
        ...pokemon,
        isStarred: !pokemon.isStarred
      }

      const pokemonsUpdated = pokemons.map((item) =>
        item.id === pokemon.id ? pokemonUpdated : { ...item, isStarred: false }
      )

      savePokemonsStorage(page, pokemonsUpdated)

      const userUpdated: User = {
        ...user,
        pokemonStarred: pokemonUpdated,
        pokemonsLiked: user.pokemonsLiked.map((item) =>
          item.id === pokemon.id ? pokemonUpdated : { ...item, isStarred: false }
        )
      }

      api.put('/user/', { user: userUpdated }).then(({ data }) => setUser(data.user))
    },
    [pokemons, page, user, setUser]
  )

  // ------------------------------

  const contextValues = useMemo(
    () => ({
      pokemons,
      page,
      getPokemons,
      handleLike,
      handleStar
    }),
    [pokemons, page, getPokemons, handleLike, handleStar]
  )

  return <PokemonsContext.Provider value={contextValues}>{children}</PokemonsContext.Provider>
}

export const usePokemons = () => useContext(PokemonsContext)
