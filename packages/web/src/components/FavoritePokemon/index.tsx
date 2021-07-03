import { AiOutlineQuestion } from 'react-icons/ai'

import { Container } from './styles'

interface FavoritePokemonProps {
  name?: string
  photo?: string
}

export function FavoritePokemon({ name, photo }: FavoritePokemonProps) {
  return (
    <Container>
      {photo ? <img src={photo} alt={name} /> : <AiOutlineQuestion />}

      <span>Qual seu pokémon favorito?</span>
    </Container>
  )
}
