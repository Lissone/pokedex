import { api } from '@external/services/pokeApi'

import { IPokemonRepository, IPokemonsList, IPokemon } from '@useCases/IPokemonRepository'

class PokemonRepository implements IPokemonRepository {
  async getAll () : Promise<IPokemonsList> {
    const response = await api.get('/pokemon')

    const { data } = response

    const pokemonsList: IPokemonsList = {
      nextPage: data.next,
      previousPage: data.previous,
      pokemons: await Promise.all<IPokemon>(
        data.results.map(async (pokemon) => await this.getOne(pokemon.name))
      )
    }

    return pokemonsList
  }

  async getOne (name: string) : Promise<IPokemon | undefined> {
    const response = await api.get(`/pokemon/${name}`)

    const { data } = response

    const pokemon: IPokemon = {
      id: data.id,
      name: data.name,
      photo: data.sprites.other.dream_world.front_default,
      height: data.height,
      weight: data.weight,
      types: data.types.map(object => object.type),
      abilities: data.abilities.map(object => object.ability)
    }

    return pokemon
  }
}

export { PokemonRepository }
