import { api } from '@external/services/pokeApi'

import { IUser } from '@useCases/IUserRepository'
import { IPokemonRepository, IPokemonsList, IPokemon } from '@useCases/IPokemonRepository'

class PokemonRepository implements IPokemonRepository {
  async getAll (user: IUser, { offset, limit }) : Promise<IPokemonsList> {
    const { data } = await api.get(`/pokemon/?offset=${offset}&limit=${limit}`)

    const pokemonsList: IPokemonsList = {
      nextPage: data.next !== null ? `?${data.next.split('?')[1]}` : null,
      previousPage: data.previous !== null ? `?${data.previous.split('?')[1]}` : null,
      pokemons: await Promise.all<IPokemon>(
        data.results.map(async (pokemon) => await this.getOne(pokemon.name, user, false))
      )
    }

    return pokemonsList
  }

  async getOne (name: string, user: IUser, singleConsult: boolean) : Promise<IPokemon | undefined> {
    const { data } = await api.get(`/pokemon/${name}`)

    const { 'official-artwork': artWork } = data.sprites.other
    const evolutions = singleConsult ? await this.getAllEvolutions(data.id) : null

    const pokemon: IPokemon = {
      id: data.id,
      name: data.name,
      photo: data.sprites.other.dream_world.front_default || artWork.front_default || data.sprites.front_default,
      height: data.height,
      weight: data.weight,
      isLiked: user.pokemonsLiked ? user.pokemonsLiked.some(pokemon => pokemon.id === data.id) : false,
      isStarred: user.pokemonStarred !== null ? user.pokemonStarred.id === data.id : false,
      types: data.types.map(object => object.type.name),
      abilities: data.abilities.map(object => object.ability.name),
      evolutions
    }

    return pokemon
  }

  async getAllEvolutions (id: string) : Promise<IPokemon[] | undefined> {
    const evolutions = [] as IPokemon[]

    await api.get(`/pokemon-species/${id}`).then(async ({ data }) => {
      const evolutionChain = await api(data.evolution_chain.url)

      const basePokemon = await api(evolutionChain.data.chain.species.url)
      const pokemon = await api.get(`/pokemon/${basePokemon.data.id}`)
      const { 'official-artwork': artWork } = pokemon.data.sprites.other

      const pokemonUpdated: IPokemon = {
        id: pokemon.data.id,
        name: pokemon.data.name,
        photo: pokemon.data.sprites.other.dream_world.front_default || artWork.front_default || pokemon.data.sprites.front_default,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        types: pokemon.data.types.map(object => object.type),
        abilities: pokemon.data.abilities.map(object => object.ability)
      }

      evolutions.push(pokemonUpdated)

      if (evolutionChain.data.chain.evolves_to.length > 0) {
        const evolution = await api(evolutionChain.data.chain.evolves_to[0].species.url)

        const pokemon = await api.get(`/pokemon/${evolution.data.id}`)
        const { 'official-artwork': artWorkEvolution } = pokemon.data.sprites.other

        const pokemonUpdated: IPokemon = {
          id: pokemon.data.id,
          name: pokemon.data.name,
          photo: pokemon.data.sprites.other.dream_world.front_default || artWorkEvolution.front_default || pokemon.data.sprites.front_default,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map(object => object.type),
          abilities: pokemon.data.abilities.map(object => object.ability)
        }

        evolutions.push(pokemonUpdated)
      }

      if (
        evolutionChain.data.chain.evolves_to.length > 0 &&
      evolutionChain.data.chain.evolves_to[0].evolves_to.length > 0
      ) {
        const evolution = await api(evolutionChain.data.chain.evolves_to[0].evolves_to[0].species.url)

        const pokemon = await api.get(`/pokemon/${evolution.data.id}`)
        const { 'official-artwork': artWorkEvolution2 } = pokemon.data.sprites.other

        const pokemonUpdated: IPokemon = {
          id: pokemon.data.id,
          name: pokemon.data.name,
          photo: pokemon.data.sprites.other.dream_world.front_default || artWorkEvolution2.front_default || pokemon.data.sprites.front_default,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map(object => object.type),
          abilities: pokemon.data.abilities.map(object => object.ability)
        }

        evolutions.push(pokemonUpdated)
      }
    }).catch(() => {
      return undefined
    })

    return evolutions
  }
}

export { PokemonRepository }
