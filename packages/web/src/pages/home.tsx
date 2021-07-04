import Head from 'next/head'
import { useCallback, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { api } from '../services/api'
import { useAuth, User } from '../hooks/useAuth'

import { Header } from '../components/Header'
import { FavoritePokemon } from '../components/FavoritePokemon'
import { Pokemon, PokemonCard } from '../components/PokemonCard'
import { Load } from '../components/Load'

import {
  Container,
  Content,
  HeaderContent,
  ListPokemonCards
} from '../styles/home'

export default function Home() {
  const { user, setUser } = useAuth()

  let pokemonNotFound = false
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('')
  const [search, setSearch] = useState('')
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  async function loadPokemons() {
    setLoading(true)

    const url = `/pokemon/${!page ? '?offset=0&limit=20' : page}`
    const { data } = await api.get(url)

    setLoading(false)

    setPage(data.nextPage)
    setPokemons(data.pokemons)
  }

  useState(
    useCallback(() => {
      loadPokemons()
    }, [search])
  )

  function morePokemons() {
    if (!page) {
      return
    }

    setLoading(true)

    api.get(`/pokemon/${page}`).then(({ data }) => {
      setLoading(false)

      setPage(data.nextPage)

      setPokemons([...pokemons, ...data.pokemons])
    })
  }

  function handleLike(pokemon: Pokemon) {
    const pokemonsUpdated = pokemons.map(item =>
      item.id === pokemon.id ? { ...item, isLiked: !pokemon.isLiked } : item
    )

    const pokemonUpdated = pokemonsUpdated.filter(
      item => item.id === pokemon.id && { ...item, isLiked: !pokemon.isLiked }
    )

    const newUser: User = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      pokemonsLiked: [...user.pokemonsLiked, pokemonUpdated[0]]
    }

    setPokemons(pokemonsUpdated)

    api.put('/user/', { user: newUser }).then(({ data }) => setUser(data.user))

    // morePokemons()
  }

  return (
    <>
      <Head>
        <title>Home - Pokedex</title>
      </Head>

      <Header />

      <Container>
        <Content>
          <header>
            <FavoritePokemon />

            <HeaderContent>
              <h1>Bem-vindo</h1>
              <strong>{user?.name}</strong>

              <span>Chegou a hora de entrar no mundo pokémon</span>
            </HeaderContent>
            <div />
          </header>

          <input
            placeholder="Pesquise pelo nome do pokémon"
            type="text"
            onChange={event => setSearch(event.target.value)}
          />

          {pokemons.length > 0 && (
            <ListPokemonCards>
              {pokemons
                .filter(pokemon => {
                  if (search === '') {
                    return pokemon
                  }

                  if (
                    pokemon.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return pokemon
                  }

                  pokemonNotFound = true
                  return null
                })
                .map(pokemon => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    handleLike={handleLike}
                  />
                ))}

              {pokemonNotFound && (
                <span>Este pokémon ainda não foi carregado</span>
              )}
            </ListPokemonCards>
          )}
        </Content>

        {loading && <Load type="cylon" color="#6D6D6D" />}
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@Pokedex/token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
