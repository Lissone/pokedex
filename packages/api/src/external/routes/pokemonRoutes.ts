import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { PokemonRepository } from '@repositories/pokemonRepository'
import { PokemonController } from '@controllers/pokemonController'

const pokemonRepository = new PokemonRepository()
const pokemonController = new PokemonController(pokemonRepository)

const pokemonRoutes = Router()

pokemonRoutes.get('/', AuthMiddleware, (req, res) => pokemonController.getAllPokemons(req, res))
pokemonRoutes.get('/:id', AuthMiddleware, (req, res) => pokemonController.getOnePokemon(req, res))

export { pokemonRoutes }
