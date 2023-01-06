import { useRouter } from 'next/router'

import { useAuth } from '@hooks/useAuth'
import { Pokemon } from '@hooks/usePokemons'

import { FavoritePokemon } from '../FavoritePokemon'
import { SignOutButton } from '../SignOutButton'
import { Container, Content } from './styles'

// -------------------------------------------------------------------

interface HeaderProps {
  readonly heading: string
  readonly description: string
  readonly pokemonStarred: Pokemon | undefined
}

export function Header({ heading, description, pokemonStarred }: HeaderProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  if (!user) return null

  return (
    <Container>
      <FavoritePokemon pokemonStarred={pokemonStarred} onClick={() => router.push('/account')} />

      <Content>
        <h1>{heading}</h1>
        <strong>{user.name}</strong>

        <span>{description}</span>
      </Content>

      <div>
        <SignOutButton onClick={signOut} />
      </div>
    </Container>
  )
}
