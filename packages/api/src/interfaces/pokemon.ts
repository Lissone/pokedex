import { IUser } from './user'

// -------------------------------------------------------------------

export interface IPokemon {
  readonly id: number
  readonly name: string
  readonly photo: string
  readonly height: number
  readonly weight: number
  readonly isLiked: boolean
  readonly isStarred: boolean
  readonly types: string[]
  readonly abilities: string[]
  readonly evolutions: IPokemon[]
}

export interface IPokemonsList {
  readonly nextPage: string | null
  readonly previousPage: string | null
  readonly pokemons: IPokemon[]
}

export interface IPokemonRepository {
  getAll(user: IUser, offset?: string, limit?: string): Promise<IPokemonsList>
  getOne(id: string, user: IUser, singleConsult?: boolean): Promise<IPokemon | undefined>
}
