interface IType {
  name: string
  url: string
}

interface IAbility {
  name: string
  url: string
}

interface IEvolutions {
  id: string
  name: string
}

interface IPokemon {
  id: string
  name: string
  photo: string
  height: string
  weight: string
  types: IType[]
  abilities: IAbility[]
  evolutions?: IEvolutions[] | undefined
}

interface IPokemonsList {
  nextPage: string | null
  previousPage: string | null
  pokemons: IPokemon[]
}

interface IPokemonRepository {
  getAll() : Promise<IPokemonsList>
  getOne(name: string) : Promise<IPokemon | undefined>
}

export { IPokemonsList, IPokemon, IPokemonRepository }
