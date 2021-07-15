import { AppProps } from 'next/app'
import { ToastContainer, Slide } from 'react-toastify'

import { AuthProvider } from '../hooks/useAuth'
import { PokemonsProvider } from '../hooks/usePokemons'

import { GlobalStyle } from '../styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />

      <AuthProvider>
        <PokemonsProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            transition={Slide}
            pauseOnHover={false}
          />

          <Component {...pageProps} />
        </PokemonsProvider>
      </AuthProvider>
    </>
  )
}
