import Head from 'next/head'
import { AiFillGithub } from 'react-icons/ai'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Developer } from '../components/Developer'

import { Container, Content, Divider } from '../styles/loginRegister'

export default function Register() {
  return (
    <>
      <Head>
        <title>Cadastro - Pokedex</title>
      </Head>

      <Container>
        <Content>
          <header>
            <img src="/images/logo.png" alt="Pokedex" />

            <span>Se inscreva para ter acesso a pokedex</span>
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

            <Input placeholder="Nome" type="text" />
            <Input placeholder="E-mail" type="email" />
            <Input placeholder="Senha" type="password" />
            <Input placeholder="Confirme sua senha" type="password" />

            <Button type="button" title="Cadastrar">
              <img src="/images/register.svg" alt="Cadastro" />
            </Button>

            <span>
              Você já tem uma conta? <a href="#">Entrar</a>
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
