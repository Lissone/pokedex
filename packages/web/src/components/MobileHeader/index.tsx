import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiExit } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { toast } from 'react-toastify'

import { useAuth } from '../../hooks/useAuth'

import { FavoritePokemon } from '../FavoritePokemon'

import { Container, Hamburguer, Menu } from './styles'

export function MobileHeader() {
  const router = useRouter()

  const { user, signOut } = useAuth()

  const [hamburguerIsOpen, setHamburguerIsOpen] = useState(false)

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

  return (
    <Container>
      <Link href="/home">
        <img src="/images/logo.png" alt="Pokedex" />
      </Link>

      <Hamburguer onClick={() => setHamburguerIsOpen(!hamburguerIsOpen)}>
        <FiMenu size={40} />
      </Hamburguer>

      <Menu isOpen={hamburguerIsOpen}>
        <FavoritePokemon
          onClick={handleClickPokemonAvatar}
          photo={user?.pokemonStarred ? user.pokemonStarred.photo : undefined}
        />

        <button className="exit" type="button" onClick={signOut}>
          <span>SAIR</span>

          <BiExit size={10} />
        </button>
      </Menu>
    </Container>
  )
}
