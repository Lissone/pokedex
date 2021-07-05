import { ButtonHTMLAttributes } from 'react'
import { AiOutlineQuestion } from 'react-icons/ai'

import { Container } from './styles'

interface FavoritePokemonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string
  photo?: string | undefined
}

export function FavoritePokemon({
  name,
  photo,
  ...rest
}: FavoritePokemonProps) {
  return (
    <Container {...rest}>
      {photo ? <img src={photo} alt={name} /> : <AiOutlineQuestion />}

      <span>Qual seu pokémon favorito?</span>
    </Container>
  )
}
