import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { Header } from '../../components/Header'
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
  const [pokemon, setPokemon] = useState(data)
  const formattedAbilities = pokemon.abilities
    .join(', ')
    .replace(/\b\w/g, l => l.toUpperCase())
  const formattedPokemonName = pokemon.name.replace(/\b\w/g, l =>
    l.toUpperCase()
  )

  function handleLike(item: Pokemon) {
    const pokemonUpdated = {
      ...item,
      isLiked: !item.isLiked
    }

    // call api user update
    setPokemon(pokemonUpdated)
  }

  return (
    <>
      <Head>
        <title>{formattedPokemonName} - Pokedex</title>
      </Head>

      <Header />

      <Container>
        <Content>
          <header>
            <LikeButton
              className="like-button"
              pokemon={pokemon}
              handleLike={() => handleLike(pokemon)}
            />
          </header>

          <Band>
            <PokemonAvatar className="avatar">
              <img src={pokemon.photo} alt={formattedPokemonName} />
            </PokemonAvatar>

            <h2>#{pokemon.id}</h2>

            <h1>{formattedPokemonName}</h1>
          </Band>

          <CardContent>
            <Row>
              <ColumnLeft>
                <Fields>
                  <Field align="center">
                    <span>Altura</span>
                    <p>{pokemon.height}m</p>
                  </Field>

                  <Divider />

                  <Field align="center">
                    <span>Peso</span>
                    <p>{pokemon.weight}kg</p>
                  </Field>
                </Fields>
              </ColumnLeft>

              <ColumnRight>
                <Fields>
                  <Field align="start">
                    <span>Habilidade</span>
                    <p>{formattedAbilities}</p>
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

                    <img src="/images/next.svg" alt="Evolui para..." />
                  </>
                ))}
            </EvolutionRow>
          </CardContent>
        </Content>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params
  // const session = await getSession({ req })

  // if (!session?.activeSubscription) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

  const pokemon = {
    id,
    name: 'bulbasaur',
    photo:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
    height: '7',
    weight: '69',
    isLiked: true,
    abilities: ['overgrow', 'chlorophyll'],
    types: ['poison', 'grass'],
    evolutions: [
      {
        id: 1,
        name: 'bulbasaur',
        photo:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        height: 7,
        weight: 69,
        types: [
          {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/'
          },
          {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/'
          }
        ],
        abilities: [
          {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/'
          },
          {
            name: 'chlorophyll',
            url: 'https://pokeapi.co/api/v2/ability/34/'
          }
        ]
      },
      {
        id: 2,
        name: 'ivysaur',
        photo:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
        height: 10,
        weight: 130,
        types: [
          {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/'
          },
          {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/'
          }
        ],
        abilities: [
          {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/'
          },
          {
            name: 'chlorophyll',
            url: 'https://pokeapi.co/api/v2/ability/34/'
          }
        ]
      },
      {
        id: 3,
        name: 'venusaur',
        photo:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
        height: 20,
        weight: 1000,
        types: [
          {
            name: 'grass',
            url: 'https://pokeapi.co/api/v2/type/12/'
          },
          {
            name: 'poison',
            url: 'https://pokeapi.co/api/v2/type/4/'
          }
        ],
        abilities: [
          {
            name: 'overgrow',
            url: 'https://pokeapi.co/api/v2/ability/65/'
          },
          {
            name: 'chlorophyll',
            url: 'https://pokeapi.co/api/v2/ability/34/'
          }
        ]
      }
    ]
  }

  return {
    props: {
      data: pokemon
    }
  }
}
