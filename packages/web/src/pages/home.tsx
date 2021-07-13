import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import { usePokemons } from '../hooks/usePokemons'

import { Header } from '../components/Header'
import { FavoritePokemon } from '../components/FavoritePokemon'
import { PokemonCard } from '../components/PokemonCard'
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

  const { user } = useAuth()
  const { pokemons, savePokemonsStorage, getPokemons, page, handleLike } =
    usePokemons()

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPokemons()

    setLoading(false)
  }, [])

  function handleMorePokemons() {
    if (page === null) {
      return
    }

    setLoading(true)
    api
      .get(`/pokemon/${page}`)
      .then(({ data }) => {
        setLoading(false)

        savePokemonsStorage(data.nextPage, [...pokemons, ...data.pokemons])
      })
      .catch(() => {
        toast.error('Ocorreu um erro inesperado', {
          hideProgressBar: true
        })
      })
  }

  function handleClickPokemonAvatar() {
    if (user.pokemonsLiked.length <= 0) {
      toast.info('Curta um pokémon para selecionar o seu favorito 😊')

      return
    }

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
            <FavoritePokemon
              onClick={handleClickPokemonAvatar}
              photo={
                user?.pokemonStarred ? user.pokemonStarred.photo : undefined
              }
            />

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
                  <MorePokemons onClick={handleMorePokemons}>
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
