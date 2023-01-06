import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { useAuth } from '@hooks/useAuth'

import { FavoritePokemon } from '../FavoritePokemon'
import { SignOutButton } from '../SignOutButton'
import { Container, Hamburguer, Menu } from './styles'

// -------------------------------------------------------------------

export function MobileHeader() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const [hamburguerIsOpen, setHamburguerIsOpen] = useState(false)

  const handleClickPokemonAvatar = () => {
    if (router.pathname === '/account') return
    if (user.pokemonsLiked.length <= 0) {
      toast.info('Curta um pokémon para selecionar o seu favorito 😊')
      return
    }

    router.push('/account')
  }

  return (
    <Container>
      <img src="/images/logo.png" alt="Pokedex" onClick={() => router.push('/home')} />

      <Hamburguer onClick={() => setHamburguerIsOpen(!hamburguerIsOpen)}>
        <FiMenu size={40} />
      </Hamburguer>

      <Menu isOpen={hamburguerIsOpen}>
        <FavoritePokemon pokemonStarred={user.pokemonStarred} onClick={handleClickPokemonAvatar} />

        <SignOutButton onClick={signOut} />
      </Menu>
    </Container>
  )
}
