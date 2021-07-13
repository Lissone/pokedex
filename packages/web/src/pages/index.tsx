import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { parseCookies } from 'nookies'
import { AiOutlineGoogle } from 'react-icons/ai'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Developer } from '../components/Developer'

import {
  Container,
  Content,
  Form,
  Divider,
  TextLink
} from '../styles/loginRegister'

interface SignInData {
  email: string
  password: string
}

export default function Login() {
  const { signInWithEmailPassword, signInWithGoogle } = useAuth()

  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(data: SignInData, { reset }) {
    try {
      setLoading(true)

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

      setLoading(false)

      formRef.current.setErrors({})
    } catch (err) {
      err.name = ''
      setLoading(false)

      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      } else {
        reset()

        toast.error(err.toString(), {
          hideProgressBar: true
        })
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
            <Button
              type="button"
              title="Google"
              color="red-200"
              onClick={signInWithGoogle}
            >
              <AiOutlineGoogle size={35} />
            </Button>

            <Divider>ou</Divider>

            <Input name="email" placeholder="E-mail" />
            <Input name="password" placeholder="Senha" type="password" />

            <Button type="submit" title="Entrar" disabled={loading}>
              <img src="/images/log-in.svg" alt="Login" />
            </Button>

            <span>
              Não tem uma conta? <TextLink href="/register">Cadastrar</TextLink>
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@Pokedex/token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
