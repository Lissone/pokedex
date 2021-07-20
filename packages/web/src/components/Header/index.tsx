import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { BiExit } from 'react-icons/bi'
import { IoChevronBack } from 'react-icons/io5'

import { useAuth } from '../../hooks/useAuth'

import { FavoritePokemon } from '../FavoritePokemon'

import { Container, Content } from './styles'

interface HeaderProps {
  favoritePokemon?: boolean
  heading?: string
  description?: string
}

export function Header({
  favoritePokemon = true,
  heading,
  description
}: HeaderProps) {
  const router = useRouter()

  const { user, signOut } = useAuth()

  function handleClickPokemonAvatar() {
    if (router.pathname === '/account') {
      return
    }

    if (user.pokemonsLiked.length <= 0) {
      toast.info('Curta um pokémon para selecionar o seu favorito 😊')

      return
    }

    router.push('/account')
  }

  function handleClickReturn() {
    router.back()
  }

  return (
    <Container>
      {favoritePokemon ? (
        <FavoritePokemon
          onClick={handleClickPokemonAvatar}
          photo={user?.pokemonStarred ? user.pokemonStarred.photo : undefined}
        />
      ) : (
        <div>
          <IoChevronBack onClick={handleClickReturn} />
        </div>
      )}

      <Content>
        <h1>{heading || 'Bem-vindo'}</h1>
        <strong>{user?.name}</strong>

        <span>{description || 'Chegou a hora de entrar no mundo pokémon'}</span>
      </Content>

      <div>
        <button type="button" onClick={signOut}>
          <span>SAIR</span>

          <BiExit size={10} />
        </button>
      </div>
    </Container>
  )
}
