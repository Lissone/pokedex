import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'

import { useAuth } from '../hooks/useAuth'
import { Pokemon, usePokemons } from '../hooks/usePokemons'

import { Header } from '../components/Header'
import { PokemonCard } from '../components/PokemonCard'

import {
  Container,
  Content,
  LikedPokemons,
  ListPokemonCards
} from '../styles/account'

export default function Account() {
  const router = useRouter()

  const { user } = useAuth()
  const { handleLike, handleStar } = usePokemons()

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (user?.pokemonsLiked.length <= 0) {
      router.push('/')
    }
  }, [user])

  function handleClickStar(pokemon: Pokemon) {
    handleStar(pokemon)
  }

  function handleClickPokemonCard(pokemonId: string) {
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <>
      <Head>
        <title>Seu perfil - Pokedex</title>
      </Head>

      <Container>
        <Content>
          <Header
            heading="Perfil"
            description="Customize seu perfil e escolha seu pokémon favorito"
          />

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
                  .sort((a, b) => {
                    if (a.id > b.id) {
                      return 1
                    }
                    if (a.id < b.id) {
                      return -1
                    }
                    return 0
                  })
                  .map(pokemon => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      handleLike={() => handleLike(pokemon, user)}
                      handleStar={() => handleClickStar(pokemon)}
                      onClick={() => handleClickPokemonCard(pokemon.id)}
                      starIcon
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
