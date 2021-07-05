import { Request, Response } from 'express'

import { IPokemonRepository } from '@useCases/IPokemonRepository'
import { UserRepository } from '@repositories/userRepository'

class PokemonController {
  repository: IPokemonRepository

  constructor (repository: IPokemonRepository) {
    this.repository = repository
  }

  async getAllPokemons (req: Request, res: Response) : Promise<void> {
    try {
      const { offset, limit } = req.query
      const { userDecoded } = req.body

      const userRepository = new UserRepository()
      const user = await userRepository.getOne(userDecoded.email)

      if (user == null) {
        res.status(401).json({ error: 'Token invalid' })
        return
      }

      const pokemons = await this.repository.getAll(user, {
        offset: String(offset),
        limit: String(limit)
      })

      res.status(200).json(pokemons)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }

  async getOnePokemon (req: Request, res: Response) : Promise<void> {
    try {
      const { id } = req.params
      const { userDecoded } = req.body

      const userRepository = new UserRepository()
      const user = await userRepository.getOne(userDecoded.email)

      if (user == null) {
        res.status(401).json({ error: 'Token invalid' })
        return
      }

      const pokemon = await this.repository.getOne(id, user, true)

      if (pokemon === undefined) {
        res.status(500).send({ message: 'Pokemon not found' })
        return
      }

      res.status(200).json(pokemon)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}

export { PokemonController }
