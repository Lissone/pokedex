import React, { useState } from 'react'
import Head from 'next/head'

import { Header } from '../components/Header'
import { FavoritePokemon } from '../components/FavoritePokemon'
import { PokemonCard } from '../components/PokemonCard'
import { Load } from '../components/Load'

import {
  Container,
  Content,
  HeaderContent,
  ListPokemonCards
} from '../styles/home'

export default function Home() {
  const pokemonsList = [
    {
      id: '1',
      name: 'Bulbasaur',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      types: ['Poison', 'Grass'],
      isLiked: true
    },
    {
      id: '2',
      name: 'Ivysaur',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
      types: ['Poison', 'Grass'],
      isLiked: true
    },
    {
      id: '3',
      name: 'Venusaur',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
      types: ['Poison', 'Grass'],
      isLiked: false
    }
  ]

  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState(pokemonsList)

  function handleLike(pokemonId: string) {
    const pokemosUpdated = pokemons.map(item =>
      item.id === pokemonId
        ? {
            ...item,
            isLiked: !item.isLiked
          }
        : item
    )

    setPokemons(pokemosUpdated)
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
            <FavoritePokemon />

            <HeaderContent>
              <h1>Bem-vindo</h1>
              <strong>Leonardo Dias Lissone</strong>

              <span>Chegou a hora de entrar no mundo pokémon</span>
            </HeaderContent>
            <div />
          </header>

          <input placeholder="Pesquise pelo nome do pokémon" type="text" />

          <ListPokemonCards>
            {pokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                handleLike={handleLike}
              />
            ))}
          </ListPokemonCards>
        </Content>

        {loading && <Load type="cylon" color="#6D6D6D" />}
      </Container>
    </>
  )
}
