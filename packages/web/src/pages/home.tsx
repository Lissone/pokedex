import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'

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
  ListPokemonCards,
  FooterContent,
  MorePokemons
} from '../styles/home'

export default function Home() {
  const router = useRouter()
  const { user, setUser } = useAuth()

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<string | null>('?offset=0&limit=20')
  const [search, setSearch] = useState('')
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  async function loadPokemons() {
    setLoading(true)

    const storagedListPokemons = localStorage.getItem('@Pokedex:pokemons')

    if (storagedListPokemons) {
      const storageParsed = JSON.parse(storagedListPokemons)

      setPokemons(storageParsed.pokemons)
      setPage(storageParsed.nextPage)
      setLoading(false)
      return
    }

    const url = `/pokemon/${page}`
    const { data } = await api.get(url)

    setLoading(false)

    setPage(data.nextPage)
    setPokemons(data.pokemons)
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  function morePokemons() {
    if (page === null) {
      return
    }

    setLoading(true)

    api.get(`/pokemon/${page}`).then(({ data }) => {
      setLoading(false)

      setPage(data.nextPage)

      setPokemons([...pokemons, ...data.pokemons])

      localStorage.setItem(
        '@Pokedex:pokemons',
        JSON.stringify({ nextPage: page, pokemons })
      )
    })
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
        ? [...user.pokemonsLiked, pokemonUpdated[0]]
        : user.pokemonsLiked.filter(
            pokemonLiked => pokemonLiked.id !== pokemonUpdated[0].id
          )
    }

    setPokemons(pokemonsUpdated)

    api.put('/user/', { user: newUser }).then(({ data }) => setUser(data.user))
  }

  function handleClickPokemonAvatar() {
    router.push('/account')
  }

  function handleClickPokemonCard(pokemonId: string) {
    router.push(`/pokemon/${pokemonId}`)
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
            <FavoritePokemon onClick={handleClickPokemonAvatar} />

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
            <>
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

                    return null
                  })
                  .map(pokemon => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      handleLike={handleLike}
                      onClick={() => handleClickPokemonCard(pokemon.id)}
                    />
                  ))}
              </ListPokemonCards>

              {!loading && (
                <FooterContent>
                  <MorePokemons onClick={morePokemons}>
                    <span>Carregar mais pokemons</span>
                  </MorePokemons>
                </FooterContent>
              )}
            </>
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
