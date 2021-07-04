import { useRef } from 'react'
import Head from 'next/head'
import * as Yup from 'yup'
import { AiFillGithub } from 'react-icons/ai'

import { useAuth } from '../hooks/useAuth'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Developer } from '../components/Developer'

import { Container, Content, Form, Divider } from '../styles/loginRegister'

interface SignInData {
  email: string
  password: string
}

export default function Login() {
  const { signInWithEmailPassword } = useAuth()
  const formRef = useRef(null)

  async function handleSubmit(data: SignInData) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail é obrigatório'),
        password: Yup.string()
          .min(5, 'Mínimo 5 caracteres')
          .required('Senha é obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await signInWithEmailPassword(data)

      formRef.current.setErrors({})
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <Container>
        <Content>
          <header>
            <img src="/images/logo.png" alt="Pokedex" />

            <span>Inicie seu conhecimento pokémon</span>
          </header>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Button type="button" title="GITHUB" color="blue-900">
              <AiFillGithub size={25} />
            </Button>

            <Divider>
              <div />
              <div>ou</div>
              <div />
            </Divider>

            <Input name="email" placeholder="E-mail" />
            <Input name="password" placeholder="Senha" type="password" />

            <Button type="submit" title="Entrar">
              <img src="/images/log-in.svg" alt="Login" />
            </Button>

            <span>
              Não tem uma conta? <a href="#">Cadastrar</a>
            </span>
          </Form>

          <footer>
            <Developer />
          </footer>
        </Content>
      </Container>
    </>
  )
}
