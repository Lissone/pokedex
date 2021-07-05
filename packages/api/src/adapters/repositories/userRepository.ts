import { database } from '@external/services/firebase'

import { IUserRepository, IUser } from '@useCases/IUserRepository'

class UserRepository implements IUserRepository {
  private get repository () {
    return database.collection('user')
  }

  async getOne (email: string) : Promise<IUser | undefined> {
    const doc = await this.repository.doc(email.toLowerCase()).get()

    const user = doc.data()

    if (user === undefined) {
      return
    }

    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      pokemonStarred: user.pokemonStarred,
      pokemonsLiked: user.pokemonsLiked
    }
  }

  async save (user: IUser) : Promise<IUser> {
    await this.repository.doc(user.email.toLowerCase()).set(user)

    return user
  }
}

export { UserRepository }
