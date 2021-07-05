import { ButtonHTMLAttributes } from 'react'

import { Pokemon } from '../PokemonCard'

import { Container } from './styles'

interface LikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pokemon: Pokemon
  handleLike: (pokemon: Pokemon) => void
}

export function LikeButton({ pokemon, handleLike, ...rest }: LikeButtonProps) {
  return (
    <Container type="button" onClick={() => handleLike(pokemon)} {...rest}>
      {pokemon.isLiked ? (
        <img src="/images/like.svg" alt="Gostei" />
      ) : (
        <img src="/images/unlike.svg" alt="Gostei" />
      )}
    </Container>
  )
}
