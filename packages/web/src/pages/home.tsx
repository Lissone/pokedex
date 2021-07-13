import Head from 'next/head'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { api } from '../services/api'
import { usePokemons } from '../hooks/usePokemons'

import { PokemonCard } from '../components/PokemonCard'
import { Load } from '../components/Load'

import {
  Container,
  Content,
  ListPokemonCards,
  FooterContent,
  MorePokemons
} from '../styles/home'
import { Header } from '../components/Header'

export default function Home() {
  const router = useRouter()

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

  function handleClickPokemonCard(pokemonId: string) {
    router.push(`/pokemon/${pokemonId}`)
  }

  return (
    <>
      <Head>
        <title>Início - Pokedex</title>
      </Head>

      <Container>
        <Content>
          <Header />

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
