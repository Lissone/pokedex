import axios from 'axios'

// -------------------------------------------------------------------

export const api = axios.create({
  baseURL: process.env.BASE_URL_API || 'https://pokeapi.co/api/v2'
})
