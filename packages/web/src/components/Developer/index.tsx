import { AiFillGithub, AiFillHeart, AiFillLinkedin } from 'react-icons/ai'
import { CgMail } from 'react-icons/cg'

import { Container, IconLink } from './styles'

export function Developer() {
  return (
    <Container>
      <div className="card-front">
        <h4>Desenvolvido com</h4>
        <AiFillHeart size={15} color="red" />
        <h4>por Lissone</h4>
      </div>

      <div className="card-back">
        <h4>Mais informações</h4>

        <div className="row">
          <IconLink target="_blank" href="https://www.linkedin.com/in/lissone/">
            <AiFillLinkedin size={20} />
          </IconLink>

          <IconLink target="_blank" href="mailto:leonardo.lissonez@gmail.com">
            <CgMail size={20} />
          </IconLink>

          <IconLink target="_blank" href="https://github.com/Lissone">
            <AiFillGithub size={20} />
          </IconLink>
        </div>
      </div>
    </Container>
  )
}
