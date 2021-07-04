import { FaUserAlt } from 'react-icons/fa'
import { BiExit } from 'react-icons/bi'

import { Container, Content } from './styles'

export function Header() {
  return (
    <Container>
      <Content>
        <img src="/images/logo.png" alt="Pokedex" />

        <div>
          <FaUserAlt size={30} />

          <button type="button">
            <span>SAIR</span>

            <BiExit size={10} />
          </button>
        </div>
      </Content>
    </Container>
  )
}
