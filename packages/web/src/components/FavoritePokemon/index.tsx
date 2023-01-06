import { ButtonHTMLAttributes } from 'react'
import { AiOutlineQuestion } from 'react-icons/ai'

import { Pokemon } from '@hooks/usePokemons'

import { Container } from './styles'

// -------------------------------------------------------------------

interface FavoritePokemonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly pokemonStarred: Pokemon | undefined
}

export function FavoritePokemon({ pokemonStarred, ...rest }: FavoritePokemonProps) {
  return (
    <Container {...rest}>
      {pokemonStarred ? <img src={pokemonStarred.photo} alt={pokemonStarred.name} /> : <AiOutlineQuestion />}

      <span>Qual seu pokémon favorito?</span>
    </Container>
  )
}
