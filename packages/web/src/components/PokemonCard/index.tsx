import Image from 'next/image'

import { LikeButton } from '../LikeButton'
import { StarButton } from '../StarButton'

import { Container, PokemonAvatar, Fields, Field, Divider } from './styles'

export interface Pokemon {
  id: string
  name: string
  photo: string
  height: string
  weight: string
  isStarred: boolean
  isLiked: boolean
  types: string[]
  abilities: string[]
  evolutions?: Pokemon[] | null
}

interface PokemonCardProps {
  pokemon: Pokemon
  starIcon?: boolean
  onClick?: (pokemonId: string) => void
  handleLike: (pokemon: Pokemon) => void
  handleStar?: (pokemon: Pokemon) => void
}

export function PokemonCard({
  pokemon,
  onClick,
  starIcon = false,
  handleLike,
  handleStar
}: PokemonCardProps) {
  const formattedTypes = pokemon.types
    .join(', ')
    .replace(/\b\w/g, l => l.toUpperCase())

  return (
    <Container>
      <div onClick={() => onClick(pokemon.id)}>
        <PokemonAvatar className="avatar">
          <Image
            width={64}
            height={64}
            src={pokemon.photo}
            alt={pokemon.name}
          />
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
          {starIcon && (
            <StarButton
              pokemon={pokemon}
              handleStar={() => handleStar(pokemon)}
            />
          )}
        </div>
      </aside>
    </Container>
  )
}
