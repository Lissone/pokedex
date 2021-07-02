import axios from 'axios'

const api = axios.create({
  baseURL: process.env.BASE_URL_API || 'https://pokeapi.co/api/v2'
})

export { api }
