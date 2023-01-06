/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
import { createContext, ReactNode, useContext, useState, useCallback, useMemo } from 'react'

import { api } from '@services/api'

import { useAuth, User } from './useAuth'

// -------------------------------------------------------------------

export interface Pokemon {
  readonly id: string
  readonly name: string
  readonly photo: string
  readonly height: string
  readonly weight: string
  readonly isStarred: boolean
  readonly isLiked: boolean
  readonly types: string[]
  readonly abilities: string[]
  readonly evolutions?: Pokemon[] | null
}

interface PokemonContextType {
  readonly pokemons: Pokemon[]
  readonly getPokemons: (page?: string) => Promise<string>
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

  // ------------------------------

  const savePokemonsStorage = (data: Pokemon[]) => {
    setPokemons(data)
    localStorage.setItem('@Pokedex:pokemons', JSON.stringify(data))
  }

  // ------------------------------

  const getPokemonsFromStorage = () => {
    const listPokemonsStoraged = localStorage.getItem('@Pokedex:pokemons')
    if (!listPokemonsStoraged) return null

    const pokemonsStoraged = JSON.parse(listPokemonsStoraged)
    if (pokemonsStoraged.length > 0) setPokemons(pokemonsStoraged)

    const pageStoraged = localStorage.getItem('@Pokedex:page')
    if (pageStoraged) return pageStoraged

    return null
  }

  const getPokemons = useCallback(
    async (page?: string) => {
      try {
        const updatedPage = page || '?offset=0&limit=50'
        if (!page) {
          const pageStoraged = getPokemonsFromStorage()
          if (pageStoraged) return pageStoraged
        }

        const { data } = await api.get(`/pokemon/${updatedPage}`)
        savePokemonsStorage([...pokemons, ...data.pokemons])
        localStorage.setItem('@Pokedex:page', data.nextPage)

        return data.nextPage
      } catch (err: any) {
        console.error(err.message)
      }
    },
    [pokemons]
  )

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

      savePokemonsStorage(pokemonsUpdated)

      api.put('/user/', { user: userUpdated }).then(({ data }) => setUser(data.user))
    },
    [pokemons, setUser, user]
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

      savePokemonsStorage(pokemonsUpdated)

      const userUpdated: User = {
        ...user,
        pokemonStarred: pokemonUpdated,
        pokemonsLiked: user.pokemonsLiked.map((item) =>
          item.id === pokemon.id ? pokemonUpdated : { ...item, isStarred: false }
        )
      }

      api.put('/user/', { user: userUpdated }).then(({ data }) => setUser(data.user))
    },
    [pokemons, user, setUser]
  )

  // ------------------------------

  const contextValues = useMemo(
    () => ({
      pokemons,
      getPokemons,
      handleLike,
      handleStar
    }),
    [pokemons, getPokemons, handleLike, handleStar]
  )

  return <PokemonsContext.Provider value={contextValues}>{children}</PokemonsContext.Provider>
}

export const usePokemons = () => useContext(PokemonsContext)
