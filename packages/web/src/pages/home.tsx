import React, { useState } from 'react'
import Head from 'next/head'

import { Header } from '../components/Header'
import { FavoritePokemon } from '../components/FavoritePokemon'
import { Pokemon, PokemonCard } from '../components/PokemonCard'
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
      name: 'bulbasaur',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      height: '7',
      weight: '69',
      isLiked: true,
      abilities: ['overgrow', 'chlorophyll'],
      types: ['poison', 'grass']
    },
    {
      id: '2',
      name: 'ivysaur',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
      height: '7',
      weight: '69',
      isLiked: true,
      abilities: ['overgrow', 'chlorophyll'],
      types: ['poison', 'grass']
    },
    {
      id: '3',
      name: 'venusaur',
      photo:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
      height: '7',
      weight: '69',
      isLiked: true,
      abilities: ['overgrow', 'chlorophyll'],
      types: ['poison', 'grass']
    }
  ]

  const [loading, setLoading] = useState(true)
  const [pokemons, setPokemons] = useState(pokemonsList)

  function handleLike(pokemon: Pokemon) {
    const pokemosUpdated = pokemons.map(item =>
      item.id === pokemon.id
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
