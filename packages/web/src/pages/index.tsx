import Head from 'next/head'

import { Container } from '../styles/home'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container>
        <h1>Hello world</h1>
      </Container>
    </>
  )
}
