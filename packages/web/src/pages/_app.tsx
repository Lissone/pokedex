import { AppProps } from 'next/app'

import { AuthProvider } from '../hooks/useAuth'

import { GlobalStyle } from '../styles/global'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
