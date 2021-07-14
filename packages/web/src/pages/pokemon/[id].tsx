import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { parseCookies } from 'nookies'

import { getApiClient } from '../../services/axios'
import { usePokemons } from '../../hooks/usePokemons'

import { LikeButton } from '../../components/LikeButton'
import { Pokemon } from '../../components/PokemonCard'
import { TypeBox } from '../../components/TypeBox'

import {
  Container,
  Content,
  Band,
  PokemonAvatar,
  CardContent,
  Row,
  ColumnLeft,
  ColumnRight,
  Fields,
  Field,
  Divider,
  EvolutionRow,
  PokemonAvatarEvolution
} from '../../styles/pokemonDetails'

interface PokemonDetailsProps {
  data: Pokemon
}

export default function PokemonDetails({ data }: PokemonDetailsProps) {
  const { handleLike } = usePokemons()

  const [pokemon, setPokemon] = useState(data)

  const heightFormatted = (Number(pokemon.height) / 10).toString()
  const weightFormatted = (Number(pokemon.weight) / 10).toString()
  const abilitiesFormatted = pokemon.abilities
    .join(', ')
    .replace(/\b\w/g, l => l.toUpperCase())
  const pokemonNameFormatted = pokemon.name.replace(/\b\w/g, l =>
    l.toUpperCase()
  )

  function handleClickLike(item: Pokemon) {
    const pokemonUpdated = { ...item, isLiked: !pokemon.isLiked }

    setPokemon(pokemonUpdated)

    handleLike(item)
  }

  return (
    <>
      <Head>
        <title>{pokemonNameFormatted} - Pokedex</title>
      </Head>

      <Container>
        <Content>
          <header>
            <LikeButton
              className="like-button"
              pokemon={pokemon}
              handleLike={() => handleClickLike(pokemon)}
            />
          </header>

          <Band>
            <PokemonAvatar className="avatar">
              <img src={pokemon.photo} alt={pokemonNameFormatted} />
            </PokemonAvatar>

            <h2>#{pokemon.id}</h2>

            <h1>{pokemonNameFormatted}</h1>
          </Band>

          <CardContent>
            <Row>
              <ColumnLeft>
                <Fields>
                  <Field align="center">
                    <span>Altura</span>
                    <p>{heightFormatted}m</p>
                  </Field>

                  <Divider />

                  <Field align="center">
                    <span>Peso</span>
                    <p>{weightFormatted}kg</p>
                  </Field>
                </Fields>
              </ColumnLeft>

              <ColumnRight>
                <Fields>
                  <Field align="start">
                    <span>Habilidade</span>
                    <p>{abilitiesFormatted}</p>
                  </Field>

                  <Divider />

                  <Field align="start">
                    <span>Tipo</span>
                    <Row>
                      {pokemon.types.map(type => (
                        <TypeBox text={type} />
                      ))}
                    </Row>
                  </Field>
                </Fields>
              </ColumnRight>
            </Row>

            <EvolutionRow>
              {pokemon.evolutions.length - 1 >= 1 &&
                pokemon.evolutions.map(evolution => (
                  <>
                    <img src="/images/next.svg" alt="Evolui para..." />

                    <PokemonAvatarEvolution>
                      <img src={evolution.photo} alt={evolution.name} />

                      <Field align="center">
                        <span>#{evolution.id}</span>
                        <p>
                          {evolution.name.replace(/\b\w/g, l =>
                            l.toUpperCase()
                          )}
                        </p>
                      </Field>
                    </PokemonAvatarEvolution>
                  </>
                ))}
            </EvolutionRow>
          </CardContent>
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

  const { id } = ctx.params

  const { data } = await apiClient.get(`/pokemon/${id}`)

  return {
    props: {
      data
    }
  }
}
