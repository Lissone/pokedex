import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'

import { getApiClient } from '@services/api'

import { useAuth } from '@hooks/useAuth'
import { usePokemons, Pokemon } from '@hooks/usePokemons'

import { LikeIcon } from '@components/Icon/LikeIcon'
import { MobileHeader } from '@components/MobileHeader'
import { TypeBox } from '@components/TypeBox'

import { withSSRAuth } from '@utils/withSSRAuth'

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
} from '@styles/pokemonDetails'

// -------------------------------------------------------------------

interface PokemonDetailsProps {
  readonly data: Pokemon
}

export default function PokemonDetails({ data }: PokemonDetailsProps) {
  const { user } = useAuth()
  const { handleLike } = usePokemons()
  const router = useRouter()

  const [pokemon, setPokemon] = useState(data)

  const heightFormatted = (Number(pokemon.height) / 10).toString()
  const weightFormatted = (Number(pokemon.weight) / 10).toString()
  const abilitiesFormatted = pokemon.abilities.join(', ').replace(/\b\w/g, (l) => l.toUpperCase())
  const pokemonNameFormatted = pokemon.name.replace(/\b\w/g, (l) => l.toUpperCase())

  const handleClickLike = (item: Pokemon) => {
    const pokemonUpdated = { ...item, isLiked: !pokemon.isLiked }
    setPokemon(pokemonUpdated)

    handleLike(item)
  }

  // ------------------------------

  if (!user) return null

  return (
    <>
      <Head>
        <title>{pokemonNameFormatted} - Pokedex</title>
      </Head>

      <MobileHeader />

      <Container>
        <Content>
          <header>
            <IoChevronBack onClick={() => router.back()} />

            <button type="button" className="like-button" onClick={() => handleClickLike(pokemon)}>
              <LikeIcon checked={pokemon.isLiked} />
            </button>
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
                <Fields className="secondField">
                  <Field align="start">
                    <span>Habilidade</span>
                    <p>{abilitiesFormatted}</p>
                  </Field>

                  <Divider className="secondDivider" />

                  <Field align="start">
                    <span>Tipo</span>
                    <Row>
                      {pokemon.types.map((type) => (
                        <TypeBox text={type} />
                      ))}
                    </Row>
                  </Field>
                </Fields>
              </ColumnRight>
            </Row>

            <EvolutionRow>
              {pokemon.evolutions.length - 1 >= 1
                ? pokemon.evolutions.map((evolution) => (
                    <div key={evolution.id} className="evolutionItem">
                      <img src="/images/next.svg" alt="Evolui para..." />

                      <PokemonAvatarEvolution>
                        <img src={evolution.photo} alt={evolution.name} />

                        <Field align="center">
                          <span>#{evolution.id}</span>
                          <p>{evolution.name.replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                        </Field>
                      </PokemonAvatarEvolution>
                    </div>
                  ))
                : null}
            </EvolutionRow>
          </CardContent>
        </Content>
      </Container>
    </>
  )
}

// -------------------------------------------------------------------

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getApiClient(ctx)
  const { id } = ctx.params
  const { data } = await apiClient.get(`/pokemon/${id}`)

  return {
    props: {
      data
    }
  }
})
