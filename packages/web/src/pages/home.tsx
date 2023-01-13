import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useAuth } from '@hooks/useAuth'
import { usePokemons } from '@hooks/usePokemons'

import { Header } from '@components/Header'
import { InputFilter } from '@components/InputFilter'
import { Load } from '@components/Load'
import { MobileHeader } from '@components/MobileHeader'
import { PokemonCard } from '@components/PokemonCard'

import { withSSRAuth } from '@utils/withSSRAuth'

import { Container, Content, ListPokemonCards, FooterContent, MorePokemons } from '@styles/home'

// -------------------------------------------------------------------

export default function Home() {
  const { user } = useAuth()
  const { pokemons, page, getPokemons, handleLike } = usePokemons()
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  // ------------------------------

  useEffect(() => {
    setLoading(true)
    getPokemons()
      .catch(() =>
        toast.error('Ocorreu um erro inesperado ao buscar os pokémons!', {
          hideProgressBar: true
        })
      )
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ------------------------------

  const handleMorePokemons = async () => {
    setLoading(true)
    getPokemons()
      .catch(() =>
        toast.error('Ocorreu um erro inesperado ao buscar os pokémons!', {
          hideProgressBar: true
        })
      )
      .finally(() => setLoading(false))
  }

  // ------------------------------

  if (!user) return null

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <MobileHeader />

      <Container>
        <Content>
          <Header
            heading="Bem-vindo"
            description="Nesta pokedex você poderá encontrar todos os pokemons que existem!"
            pokemonStarred={user.pokemonStarred}
          />

          <div>
            <InputFilter setSearch={setSearch} />

            {pokemons.length > 0 ? (
              <>
                <ListPokemonCards>
                  {pokemons
                    .filter((pokemon) => {
                      if (search === '') return pokemon
                      if (pokemon.name.toLowerCase().includes(search.toLowerCase())) return pokemon
                      return null
                    })
                    .map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        handleLike={handleLike}
                        onClick={() => router.push(`/pokemon/${pokemon.id}`)}
                      />
                    ))}
                </ListPokemonCards>

                {!loading && !!page ? (
                  <FooterContent>
                    <MorePokemons onClick={handleMorePokemons}>
                      <span>Carregar mais pokemons</span>
                    </MorePokemons>
                  </FooterContent>
                ) : null}
              </>
            ) : null}
          </div>
        </Content>

        {loading ? <Load type="cylon" color="#6D6D6D" /> : null}
      </Container>
    </>
  )
}

// -------------------------------------------------------------------

export const getServerSideProps = withSSRAuth(async () => ({
  props: {}
}))
