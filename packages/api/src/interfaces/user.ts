import { IPokemon } from './pokemon'

// -------------------------------------------------------------------

export interface IUser {
  readonly uid: string
  readonly name: string
  readonly email: string
  readonly password: string
  readonly createdAt: Date
  readonly pokemonStarred: IPokemon | null
  readonly pokemonsLiked: IPokemon[]
}

/** Jwt payload user */
export interface IUserDecoded {
  readonly uid: string
  readonly name: string
  readonly email: string
}

export interface IUserRepository {
  getOne(email: string): Promise<IUser | undefined>
  save(user: IUser): Promise<IUser>
}
