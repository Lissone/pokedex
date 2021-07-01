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
      createdAt: user.createdAt
    }
  }

  async create ({ uid, name, email, password, createdAt }: IUser) : Promise<IUser> {
    await this.repository.doc(email.toLowerCase()).set({
      uid,
      name,
      email,
      password,
      createdAt
    })

    return {
      uid,
      name,
      email,
      password,
      createdAt
    }
  }
}

export { UserRepository }
