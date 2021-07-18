import { IPokemon } from './IPokemonRepository'

interface IUserDecoded {
  uid: string
  name: string
  email: string
  password: string
  createdAt: Date
}

interface IUser {
  uid: string
  name: string
  email: string
  password: string
  createdAt: Date
  pokemonStarred: IPokemon | null
  pokemonsLiked: IPokemon[]
}

interface IUserRepository {
  getOne(email: string) : Promise<IUser | undefined>
  save(user: IUser) : Promise<IUser>
}

export { IUserRepository, IUser, IUserDecoded }
