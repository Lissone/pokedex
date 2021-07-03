import Head from 'next/head'
import { AiFillGithub } from 'react-icons/ai'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Developer } from '../components/Developer'

import { Container, Content, Divider } from '../styles/login'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login - Pokedex</title>
      </Head>

      <Container>
        <Content>
          <header>
            <img src="/images/logo.png" alt="Pokedex" />

            <span>Inicie seu conhecimento pokémon</span>
          </header>

          <form>
            <Button type="button" title="GITHUB" color="blue-900">
              <AiFillGithub size={25} />
            </Button>

            <Divider>
              <div />
              <div>ou</div>
              <div />
            </Divider>

            <Input placeholder="E-mail" type="email" />
            <Input placeholder="Senha" type="password" />

            <Button type="button" title="Entrar">
              <img src="/images/log-in.svg" alt="Login" />
            </Button>

            <span>
              Não tem uma conta? <a href="#">Cadastrar</a>
            </span>
          </form>

          <footer>
            <Developer />
          </footer>
        </Content>
      </Container>
    </>
  )
}
