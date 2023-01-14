/* eslint-disable import/no-cycle */
import Image from 'next/image'

import { Pokemon } from '@hooks/usePokemons'

import { LikeIcon } from '@components/Icon/LikeIcon'
import { StarIcon } from '@components/Icon/StarIcon'

import { Container, PokemonAvatar, Fields, Field, Divider, Buttons, LikeButton, StarButton } from './styles'

// -------------------------------------------------------------------

interface PokemonCardProps {
  readonly pokemon: Pokemon
  readonly starIcon?: boolean
  readonly onClick?: (pokemonId: number) => void
  readonly handleLike: (pokemon: Pokemon) => void
  readonly handleStar?: (pokemon: Pokemon) => void
}

export function PokemonCard({ pokemon, onClick, starIcon = false, handleLike, handleStar }: PokemonCardProps) {
  const formattedTypes = pokemon.types.join(', ').replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <Container>
      <div onClick={() => onClick(pokemon.id)}>
        <PokemonAvatar className="avatar">
          <Image width={64} height={64} src={pokemon.photo} alt={pokemon.name} />
        </PokemonAvatar>

        <Fields>
          <Field>
            <span>Nome</span>
            <p>{pokemon.name.replace(/\b\w/g, (l) => l.toUpperCase())}</p>
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

        <Buttons starIcon={starIcon}>
          <LikeButton type="button" onClick={() => handleLike(pokemon)}>
            <LikeIcon checked={pokemon.isLiked} />
          </LikeButton>

          {starIcon ? (
            <StarButton type="button" onClick={() => handleStar(pokemon)}>
              <StarIcon checked={pokemon.isStarred} />
            </StarButton>
          ) : null}
        </Buttons>
      </aside>
    </Container>
  )
}
