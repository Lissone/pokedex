import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'
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

        <div>
          <Link href="/account">
            <FaUserAlt size={30} />
          </Link>

          <button type="button" onClick={signOut}>
            <span>SAIR</span>

            <BiExit size={10} />
          </button>
        </div>
      </Content>
    </Container>
  )
}
