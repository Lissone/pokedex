interface IUser {
  uid: string
  name: string
  email: string
  password: string
  createdAt: Date
}

interface IUserRepository {
  getOne(email: string) : Promise<IUser | undefined>
  create(user: IUser) : Promise<IUser>
}

export { IUserRepository, IUser }
