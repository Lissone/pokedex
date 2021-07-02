interface IType {
  name: string
  url: string
}

interface IAbility {
  name: string
  url: string
}

interface IPokemon {
  id: string
  name: string
  photo: string
  height: string
  weight: string
  types: IType[]
  abilities: IAbility[]
  evolutions?: IPokemon[] | null
}

interface IPokemonsList {
  nextPage: string | null
  previousPage: string | null
  pokemons: IPokemon[]
}

interface IListingConfig {
  offset: string | undefined
  limit: string | undefined
}

interface IPokemonRepository {
  getAll(config: IListingConfig) : Promise<IPokemonsList>
  getOne(name: string, singleConsult: boolean) : Promise<IPokemon | undefined>
  getAllEvolutions (id: string) : Promise<IPokemon[] | undefined>
}

export { IPokemonsList, IPokemon, IPokemonRepository }
