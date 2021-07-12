import Link from 'next/link'
import { BiExit } from 'react-icons/bi'

import { useAuth } from '../../hooks/useAuth'

import { Container, Content } from './styles'

export function Header() {
  const { signOut } = useAuth()

  return (
    <Container>
      <Content>
        <Link href="/">
          <img src="/images/logo.png" alt="Pokedex" />
        </Link>

        <button type="button" onClick={signOut}>
          <span>SAIR</span>

          <BiExit size={10} />
        </button>
      </Content>
    </Container>
  )
}
