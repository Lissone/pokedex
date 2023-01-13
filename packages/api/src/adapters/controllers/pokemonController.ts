/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { UserRepository } from '@repositories/userRepository'

import { MSG } from '@shared/msg'

import { IPokemonRepository } from '@interfaces/pokemon'
import { IUserRepository } from '@interfaces/user'

// -------------------------------------------------------------------

export class PokemonController {
  readonly pokemonRepository: IPokemonRepository
  readonly userRepository: IUserRepository

  constructor(pokemonRepository: IPokemonRepository, userRepository: UserRepository) {
    this.pokemonRepository = pokemonRepository
    this.userRepository = userRepository
  }

  async getAllPokemons(req: Request, res: Response) {
    try {
      const { offset, limit } = req.query
      const { userDecoded } = req.body

      const user = await this.userRepository.getOne(userDecoded.email)
      if (!user) {
        return res.status(404).send({ message: MSG.USER_NOT_FOUND })
      }

      const pokemons = await this.pokemonRepository.getAll(user, String(offset), String(limit))

      return res.status(200).json(pokemons)
    } catch (err: any) {
      return res.status(500).send({ message: err.message })
    }
  }

  async getOnePokemon(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { userDecoded } = req.body

      const user = await this.userRepository.getOne(userDecoded.email)
      if (!user) {
        return res.status(404).send({ message: MSG.USER_NOT_FOUND })
      }

      const pokemon = await this.pokemonRepository.getOne(id, user)
      if (!pokemon) {
        return res.status(404).send({ message: MSG.POKEMON_NOT_FOUND })
      }

      return res.status(200).json(pokemon)
    } catch (err: any) {
      return res.status(500).send({ message: err.message })
    }
  }
}
