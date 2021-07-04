import { LikeButton } from '../LikeButton'

import { Container, PokemonAvatar, Fields, Field, Divider } from './styles'

export interface Pokemon {
  id: string
  name: string
  photo: string
  height: string
  weight: string
  isLiked: boolean
  types: string[]
  abilities: string[]
  evolutions?: Pokemon[] | null
}

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemonId: string) => void
  handleLike: (pokemon: Pokemon) => void
}

export function PokemonCard({
  pokemon,
  onClick,
  handleLike
}: PokemonCardProps) {
  const formattedTypes = pokemon.types
    .join(', ')
    .replace(/\b\w/g, l => l.toUpperCase())

  return (
    <Container onClick={() => onClick(pokemon.id)}>
      <div>
        <PokemonAvatar className="avatar">
          <img src={pokemon.photo} alt={pokemon.name} />
        </PokemonAvatar>

        <Fields>
          <Field>
            <span>Nome</span>
            <p>{pokemon.name.replace(/\b\w/g, l => l.toUpperCase())}</p>
          </Field>

          <Field>
            <span>Tipo</span>
            <p>{formattedTypes}</p>
          </Field>
        </Fields>
      </div>

      <aside>
        <Divider>
          <span>{`#${pokemon.id}`}</span>
        </Divider>

        <div>
          <LikeButton
            pokemon={pokemon}
            handleLike={() => handleLike(pokemon)}
          />
        </div>
      </aside>
    </Container>
  )
}
