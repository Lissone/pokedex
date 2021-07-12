import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { parseCookies } from 'nookies'

import { useAuth } from '../hooks/useAuth'
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

export default function Account() {
  const { user } = useAuth()
  const { handleLike, handleStar } = usePokemons()

  const [search, setSearch] = useState('')
  const [starIcon, setStarIcon] = useState(true)

  function handleClickStar(pokemon: Pokemon) {
    setStarIcon(false)

    handleStar(pokemon)
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
            <FavoritePokemon
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

          {user?.pokemonsLiked.length > 0 && (
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
                {user?.pokemonsLiked
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
                      handleLike={() => handleLike(pokemon, user)}
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
