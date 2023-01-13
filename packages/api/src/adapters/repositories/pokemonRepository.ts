import { api } from '@external/services/pokeApi'

import { IPokemonRepository, IPokemonsList, IPokemon } from '@interfaces/pokemon'
import { IUser } from '@interfaces/user'

// -------------------------------------------------------------------

interface IPokemonListResponse {
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

interface IPokemonResponse {
  id: number
  name: string
  height: number
  weight: number
  types: {
    type: {
      name: string
    }
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
    other: {
      dream_world: {
        front_default: string
      }
      'official-artwork': {
        front_default: string
      }
    }
  }
}

interface IPokemonEvolutionChainResponse {
  chain: {
    evolves_to: {
      evolves_to: {
        species: {
          name: string
        }
      }[]
      species: {
        name: string
      }
    }[]
    species: {
      name: string
    }
  }
}

interface IPokemonSpecieResponse {
  evolution_chain: {
    url: string
  }
}

// -------------------------------------------------------------------

export class PokemonRepository implements IPokemonRepository {
  async getAll(user: IUser, offset = '0', limit = '20') {
    const { data } = await api.get<IPokemonListResponse>(`/pokemon/?offset=${offset}&limit=${limit}`)

    const pokemonsList: IPokemonsList = {
      nextPage: data.next ? `?${data.next.split('?')[1]}` : null,
      previousPage: data.previous ? `?${data.previous.split('?')[1]}` : null,
      pokemons: await Promise.all(data.results.map(result => this.getOne(result.name, user, false)))
    }

    return pokemonsList
  }

  async getOne(id: string, user: IUser, withEvolutions = true) {
    const { data } = await api.get<IPokemonResponse>(`/pokemon/${id}`)

    const pokemon = this.pokemonMapper(data, user)
    const evolutions = withEvolutions ? await this.getEvolutions(pokemon, user) : []

    return { ...pokemon, evolutions }
  }

  // ------------------------------

  private async getEvolutions(pokemon: IPokemon, user: IUser) {
    const evolutions = [] as IPokemon[]

    try {
      const { data: pokemonSpecie } = await api.get<IPokemonSpecieResponse>(`/pokemon-species/${pokemon.id}`)
      const { data: evolutionChain } = await api.get<IPokemonEvolutionChainResponse>(pokemonSpecie.evolution_chain.url)

      let evolutionPokemon = await this.getOne(evolutionChain.chain.species.name, user, false)
      evolutions.push(evolutionPokemon)

      if (evolutionChain.chain.evolves_to.length > 0) {
        const evolutionName = evolutionChain.chain.evolves_to[0].species.name
        evolutionPokemon = await this.getOne(evolutionName, user, false)
        evolutions.push(evolutionPokemon)
      }

      if (evolutionChain.chain.evolves_to.length > 0 && evolutionChain.chain.evolves_to[0].evolves_to.length > 0) {
        const evolutionName = evolutionChain.chain.evolves_to[0].evolves_to[0].species.name
        evolutionPokemon = await this.getOne(evolutionName, user, false)
        evolutions.push(evolutionPokemon)
      }
    } catch {
      return []
    }

    return evolutions
  }

  private pokemonMapper(pokemonResponse: IPokemonResponse, user: IUser) {
    const { other: otherSprites, front_default: defaultSprite } = pokemonResponse.sprites
    const { dream_world: spriteDreamWorld, 'official-artwork': spriteArtWork } = otherSprites
    const photo = spriteDreamWorld.front_default || spriteArtWork.front_default || defaultSprite

    const isLiked =
      user.pokemonsLiked.length !== 0 ? user.pokemonsLiked.some(pokemon => pokemon.id === pokemonResponse.id) : false
    const isStarred = user.pokemonStarred?.id === pokemonResponse.id

    const pokemon: IPokemon = {
      id: pokemonResponse.id,
      name: pokemonResponse.name,
      photo,
      height: pokemonResponse.height,
      weight: pokemonResponse.weight,
      isLiked,
      isStarred,
      types: pokemonResponse.types.map(o => o.type.name),
      abilities: pokemonResponse.abilities.map(o => o.ability.name),
      evolutions: []
    }

    return pokemon
  }
}
