import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'

import { useAuth } from '@hooks/useAuth'
import { usePokemons } from '@hooks/usePokemons'

import { Header } from '@components/Header'
import { InputFilter } from '@components/InputFilter'
import { MobileHeader } from '@components/MobileHeader'
import { PokemonCard } from '@components/PokemonCard'

import { withSSRAuth } from '@utils/withSSRAuth'

import { Container, Content, LikedPokemons, LikedPokemonsHeader, ListPokemonCards } from '@styles/account'

// -------------------------------------------------------------------

export default function Account() {
  const { user } = useAuth()
  const { handleLike, handleStar } = usePokemons()
  const router = useRouter()

  const [search, setSearch] = useState('')

  // ------------------------------

  if (!user) return null

  return (
    <>
      <Head>
        <title>Perfil da Pokedex</title>
      </Head>

      <MobileHeader />

      <Container>
        <Content>
          <Header
            heading="Perfil"
            description="Customize seu perfil, escolha seu pokémon favorito e compartilhe a pokedex com seus amigos!"
            pokemonStarred={user.pokemonStarred}
          />

          {user.pokemonsLiked.length > 0 ? (
            <LikedPokemons>
              <LikedPokemonsHeader>
                <IoChevronBack size={42} onClick={() => router.back()} />

                <div className="heading">
                  <h2>Pokémons curtidos</h2>
                  <span>
                    Lista de todos os pokemons que você curte. Volte para a pokedex se quiser capturar mais pokemons
                    para sua lista!
                  </span>
                </div>

                <div className="invisibleBox" />
              </LikedPokemonsHeader>

              <div>
                <InputFilter setSearch={setSearch} />

                <ListPokemonCards>
                  {user.pokemonsLiked
                    .filter((pokemon) => {
                      if (search === '') return pokemon
                      if (pokemon.name.toLowerCase().includes(search.toLowerCase())) return pokemon
                      return null
                    })
                    .sort((a, b) => {
                      if (a.id > b.id) return 1
                      if (a.id < b.id) return -1
                      return 0
                    })
                    .map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        handleLike={() => handleLike(pokemon, user)}
                        handleStar={() => handleStar(pokemon)}
                        onClick={() => router.push(`/pokemon/${pokemon.id}`)}
                        starIcon
                      />
                    ))}
                </ListPokemonCards>
              </div>
            </LikedPokemons>
          ) : null}
        </Content>
      </Container>
    </>
  )
}

// -------------------------------------------------------------------

export const getServerSideProps = withSSRAuth(async () => ({
  props: {}
}))
