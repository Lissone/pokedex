import { AppProps } from 'next/app'

import { AuthProvider } from '../hooks/useAuth'
import { PokemonsProvider } from '../hooks/usePokemons'

import { GlobalStyle } from '../styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <PokemonsProvider>
          <Component {...pageProps} />
        </PokemonsProvider>
      </AuthProvider>
    </>
  )
}
