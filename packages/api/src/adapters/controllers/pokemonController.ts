import { Request, Response } from 'express'

import { IPokemonRepository } from '@useCases/IPokemonRepository'

class PokemonController {
  repository: IPokemonRepository

  constructor (repository: IPokemonRepository) {
    this.repository = repository
  }

  async getAllPokemons (req: Request, res: Response) : Promise<void> {
    try {
      const { offset, limit } = req.query

      const pokemons = await this.repository.getAll({
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

      const pokemon = await this.repository.getOne(id)

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
