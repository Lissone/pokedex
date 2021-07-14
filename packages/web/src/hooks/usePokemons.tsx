import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect
} from 'react'

import { useAuth, User } from './useAuth'
import { api } from '../services/api'

export interface Pokemon {
  id: string
  name: string
  photo: string
  height: string
  weight: string
  isStarred: boolean
  isLiked: boolean
  types: string[]
  abilities: string[]
  evolutions?: Pokemon[] | null
}

interface PokemonContextType {
  pokemons: Pokemon[]
  page: string
  loading: boolean
  setLoading: (loading: boolean) => void
  savePokemonsStorage: (page: string, pokemon: Pokemon[]) => void
  handleLike: (pokemon: Pokemon, user?: User) => void
  handleStar: (pokemon: Pokemon) => void
}

interface PokemonContextProviderProps {
  children: ReactNode
}

export const PokemonsContext = createContext({} as PokemonContextType)

export function PokemonsProvider({ children }: PokemonContextProviderProps) {
  const { user, setUser } = useAuth()

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [page, setPage] = useState<string | null>('?offset=0&limit=50')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storagedListPokemons = localStorage.getItem('@Pokedex:pokemons')

    if (storagedListPokemons) {
      const storageParsed = JSON.parse(storagedListPokemons)

      setPage(storageParsed.nextPage)
      setPokemons(storageParsed.pokemons)
    } else if (pokemons.length <= 0) {
      api.get(`/pokemon/${page}`).then(({ data }) => {
        setPage(data.nextPage)
        setPokemons(data.pokemons)
      })
    }

    setLoading(false)
  }, [])

  function savePokemonsStorage(nextPage: string, data: Pokemon[]) {
    if (!data) {
      return
    }

    setPage(nextPage)
    setPokemons(data)

    localStorage.setItem(
      '@Pokedex:pokemons',
      JSON.stringify({ nextPage, pokemons: data })
    )
  }

  function handleLike(pokemon: Pokemon, userData?: User) {
    let userUpdated: User

    const pokemonsUpdated = pokemons.map(item =>
      item.id === pokemon.id ? { ...item, isLiked: !pokemon.isLiked } : item
    )

    if (!userData) {
      const pokemonUpdated = pokemonsUpdated.filter(
        item => item.id === pokemon.id
      )

      userUpdated = {
        uid: user.uid,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        pokemonStarred: user.pokemonStarred,
        pokemonsLiked: pokemonUpdated[0].isLiked
          ? [...user?.pokemonsLiked, pokemonUpdated[0]]
          : user.pokemonsLiked.filter(
              pokemonLiked => pokemonLiked.id !== pokemonUpdated[0].id
            )
      }
    } else {
      userUpdated = {
        ...userData,
        pokemonsLiked: user.pokemonsLiked.filter(item => item.id !== pokemon.id)
      }
    }

    savePokemonsStorage(page, pokemonsUpdated)

    api
      .put('/user/', { user: userUpdated })
      .then(({ data }) => setUser(data.user))
  }

  function handleStar(pokemon: Pokemon) {
    const pokemonUpdated = {
      ...pokemon,
      isStarred: !pokemon.isStarred
    }

    const newUser: User = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      pokemonStarred: pokemonUpdated,
      pokemonsLiked: user.pokemonsLiked
    }

    api.put('/user/', { user: newUser }).then(({ data }) => setUser(data.user))
  }

  return (
    <PokemonsContext.Provider
      value={{
        pokemons,
        savePokemonsStorage,
        page,
        loading,
        setLoading,
        handleLike,
        handleStar
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
