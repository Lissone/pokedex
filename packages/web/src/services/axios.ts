import axios from 'axios'
import { parseCookies } from 'nookies'

export function getApiClient(ctx?: any) {
  const { '@Pokedex/token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_BASE_URL_API || 'http://localhost:5000/api/v1'
  })

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`
  }

  return api
}
