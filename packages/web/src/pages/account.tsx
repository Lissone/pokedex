import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { parseCookies } from 'nookies'

import { User } from '../hooks/useAuth'
import { Pokemon, usePokemons } from '../hooks/usePokemons'

import { Header } from '../components/Header'
import { FavoritePokemon } from '../components/FavoritePokemon'
import { PokemonCard } from '../components/PokemonCard'

import {
  Container,
  Content,
  HeaderContent,
  LikedPokemons,
  ListPokemonCards
} from '../styles/account'
import { getApiClient } from '../services/axios'

interface AccountProps {
  data: User
}

export default function Account({ data }: AccountProps) {
  const { handleLike, handleStar } = usePokemons()

  const [search, setSearch] = useState('')
  const [starIcon, setStarIcon] = useState(true)
  const [pokemonPhoto, setPokemonPhoto] = useState<string | undefined>(
    data?.pokemonStarred?.photo || undefined
  )

  function handleClickStar(pokemon: Pokemon) {
    setStarIcon(false)
    setPokemonPhoto(pokemon.photo)

    handleStar(pokemon)
  }

  function handleClickLike(pokemon: Pokemon) {
    const pokemonsUpdated = data.pokemonsLiked.filter(
      item => item.id !== pokemon.id
    )

    data.pokemonsLiked = pokemonsUpdated

    handleLike(pokemon, data)
  }

  return (
    <>
      <Head>
        <title>Seu perfil - Pokedex</title>
      </Head>

      <Header />

      <Container>
        <Content>
          <header>
            <FavoritePokemon photo={pokemonPhoto} />

            <HeaderContent>
              <h1>Bem-vindo</h1>
              <strong>{data?.name}</strong>

              <span>Chegou a hora de entrar no mundo pokémon</span>
            </HeaderContent>

            <div />
          </header>

          {data?.pokemonsLiked.length > 0 && (
            <LikedPokemons>
              <header>
                <h2>Pokémons curtidos</h2>
              </header>

              <input
                placeholder="Pesquise pelo nome do pokémon"
                type="text"
                onChange={event => setSearch(event.target.value)}
              />

              <ListPokemonCards>
                {data.pokemonsLiked
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
                      starIcon={starIcon}
                      handleLike={() => handleClickLike(pokemon)}
                      handleStar={() => handleClickStar(pokemon)}
                    />
                  ))}
              </ListPokemonCards>
            </LikedPokemons>
          )}
        </Content>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apiClient = getApiClient(ctx)
  const { '@Pokedex/token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data } = await apiClient.get('/user/recover')

  return {
    props: {
      data: data.user
    }
  }
}
