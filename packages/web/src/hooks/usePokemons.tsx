import { createContext, ReactNode, useContext, useState } from 'react'

import { useAuth, User } from './useAuth'
import { api } from '../services/api'

export interface Pokemon {
  id: string
  name: string
  photo: string
  height: string
  weight: string
  isLiked: boolean
  types: string[]
  abilities: string[]
  evolutions?: Pokemon[] | null
}

interface PokemonContextType {
  pokemons: Pokemon[]
  page: string
  getPokemons: () => Promise<void>
  savePokemonsStorage: (page: string, pokemon: Pokemon[]) => Promise<void>
  handleLike: (pokemon: Pokemon) => void
}

interface PokemonContextProviderProps {
  children: ReactNode
}

export const PokemonsContext = createContext({} as PokemonContextType)

export function PokemonsProvider({ children }: PokemonContextProviderProps) {
  const { user, setUser } = useAuth()

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [page, setPage] = useState<string | null>('?offset=0&limit=20')

  async function getPokemons() {
    try {
      if (pokemons.length <= 0) {
        const url = `/pokemon/${page}`
        const { data } = await api.get(url)

        setPage(data.nextPage)
        setPokemons(data.pokemons)
      }

      const storagedListPokemons = localStorage.getItem('@Pokedex:pokemons')

      if (storagedListPokemons) {
        const storageParsed = JSON.parse(storagedListPokemons)

        setPage(storageParsed.nextPage)
        setPokemons(storageParsed.pokemons)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async function savePokemonsStorage(nextPage: string, data: Pokemon[]) {
    setPage(nextPage)
    setPokemons(data)

    localStorage.setItem(
      '@Pokedex:pokemons',
      JSON.stringify({ nextPage, pokemons: data })
    )
  }

  function handleLike(pokemon: Pokemon) {
    const pokemonsUpdated = pokemons.map(item =>
      item.id === pokemon.id ? { ...item, isLiked: !pokemon.isLiked } : item
    )

    const pokemonUpdated = pokemonsUpdated.filter(
      item => item.id === pokemon.id
    )

    const newUser: User = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      pokemonsLiked: pokemonUpdated[0].isLiked
        ? [...user?.pokemonsLiked, pokemonUpdated[0]]
        : user.pokemonsLiked.filter(
            pokemonLiked => pokemonLiked.id !== pokemonUpdated[0].id
          )
    }

    savePokemonsStorage(page, pokemonsUpdated)

    api.put('/user/', { user: newUser }).then(({ data }) => setUser(data.user))
  }

  return (
    <PokemonsContext.Provider
      value={{
        pokemons,
        getPokemons,
        savePokemonsStorage,
        page,
        handleLike
      }}
    >
      {children}
    </PokemonsContext.Provider>
  )
}

export function usePokemons() {
  const context = useContext(PokemonsContext)

  return context
}
