import { SubmitHandler } from '@unform/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { useAuth } from '@hooks/useAuth'

import { Button } from '@components/Button'
import { Developer } from '@components/Developer'
import { Input } from '@components/Input'

import { withSSRGuest } from '@utils/withSSRGuest'

import { Container, Content, Form, Divider, TextLink } from '@styles/loginRegister'

// -------------------------------------------------------------------

interface FormValues {
  readonly email: string
  readonly password: string
}

export default function Login() {
  const { signInWithEmailPassword, signInWithGoogle } = useAuth()

  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const handleSubmit: SubmitHandler<FormValues> = async (data, { reset }) => {
    try {
      setLoading(true)

      await schema.validate(data, {
        abortEarly: false
      })

      await signInWithEmailPassword(data)

      formRef.current.setErrors({})
    } catch (err: any) {
      err.name = ''
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message
        })
        formRef.current.setErrors(errorMessages)
      } else {
        reset()
        toast.error(err.toString(), {
          hideProgressBar: true
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Entre na Pokedex</title>
      </Head>

      <Container>
        <Content>
          <header>
            <img src="/images/logo.png" alt="Pokedex" />
            <span>Inicie seu conhecimento pokémon</span>
          </header>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Button type="button" title="Google" color="red-500" onClick={signInWithGoogle}>
              <AiOutlineGoogle size={35} />
            </Button>

            <Divider>ou</Divider>

            <Input name="email" placeholder="E-mail" />
            <Input name="password" placeholder="Senha" type="password" />

            <Button type="submit" title="Entrar" disabled={loading}>
              <img src="/images/log-in.svg" alt="Login" />
            </Button>

            <span>
              Não tem uma pokedex?{' '}
              <Link href="/register">
                <TextLink>Crie uma</TextLink>
              </Link>
            </span>
          </Form>
        </Content>

        <footer>
          <Developer />
        </footer>
      </Container>
    </>
  )
}

const schema = Yup.object().shape({
  email: Yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  password: Yup.string().min(5, 'Mínimo 5 caracteres').required('Senha é obrigatória')
})

// -------------------------------------------------------------------

export const getServerSideProps = withSSRGuest(async () => ({
  props: {}
}))
