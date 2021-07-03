import { Container, PokemonAvatar, Fields, Field, Divider } from './styles'

interface PokemonCardProps {
  pokemon: {
    id: string
    name: string
    photo: string
    isLiked: boolean
    types: string[]
  }
  handleLike: (pokemonId: string) => void
}

export function PokemonCard({ pokemon, handleLike }: PokemonCardProps) {
  const formattedTypes = pokemon.types.join(', ')

  return (
    <Container>
      <div>
        <PokemonAvatar className="avatar">
          <img src={pokemon.photo} alt={pokemon.name} />
        </PokemonAvatar>

        <Fields>
          <Field>
            <span>Nome</span>
            <p>{pokemon.name}</p>
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
          <button type="button" onClick={() => handleLike(pokemon.id)}>
            {pokemon.isLiked ? (
              <img src="/images/like.svg" alt="Gostei" />
            ) : (
              <img src="/images/unlike.svg" alt="Gostei" />
            )}
          </button>
        </div>
      </aside>
    </Container>
  )
}
