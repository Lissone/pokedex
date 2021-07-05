import { ButtonHTMLAttributes } from 'react'

import { Pokemon } from '../PokemonCard'

import { Container } from './styles'

interface StarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pokemon: Pokemon
  handleStar: (pokemon: Pokemon) => void
}

export function StarButton({ pokemon, handleStar, ...rest }: StarButtonProps) {
  return (
    <Container type="button" onClick={() => handleStar(pokemon)} {...rest}>
      {pokemon.isStarred ? (
        <img src="/images/star-checked.svg" alt="Gostei" />
      ) : (
        <img src="/images/star-unchecked.svg" alt="Gostei" />
      )}
    </Container>
  )
}
