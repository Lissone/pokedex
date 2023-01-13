import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { PokemonRepository } from '@repositories/pokemonRepository'
import { UserRepository } from '@repositories/userRepository'

import { PokemonController } from '@controllers/pokemonController'

// -------------------------------------------------------------------

export const pokemonRoutes = Router()

const pokemonRepository = new PokemonRepository()
const userRepository = new UserRepository()

const pokemonController = new PokemonController(pokemonRepository, userRepository)

// ------------------------------

pokemonRoutes.get('/', AuthMiddleware, (req, res) => pokemonController.getAllPokemons(req, res))
pokemonRoutes.get('/:id', AuthMiddleware, (req, res) => pokemonController.getOnePokemon(req, res))
