/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { MSG } from '@shared/msg'

import { IUserDecoded, IUserRepository } from '@interfaces/user'

// -------------------------------------------------------------------

const SECRET_KEY = process.env.SECRET_KEY || 'supersecret'

export class UserController {
  readonly repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await this.repository.getOne(email)
      if (!user) {
        return res.status(404).send({ message: MSG.USER_NOT_FOUND })
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ message: MSG.USER_INVALID_PASSWORD })
      }

      const tokenValues = this.generateJwtToken({
        uid: user.uid,
        name: user.name,
        email: user.email
      })

      return res.status(200).json({ user, ...tokenValues })
    } catch (err: any) {
      return res.status(500).send({ message: err.message })
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      let user = await this.repository.getOne(email)
      if (user?.email === email) {
        return res.status(400).send({ message: MSG.USER_ALREADY_EXISTS })
      }

      const passwordHashed = await bcrypt.hash(password, 5)
      user = await this.repository.save({
        ...req.body,
        uid: uuidv4(),
        password: passwordHashed,
        createdAt: new Date(),
        pokemonStarred: null,
        pokemonsLiked: []
      })

      const tokenValues = this.generateJwtToken({
        uid: user.uid,
        name: user.name,
        email: user.email
      })

      return res.status(201).json({ user, ...tokenValues })
    } catch (err: any) {
      return res.status(500).send({ message: err.message })
    }
  }

  async recoverInformation(req: Request, res: Response) {
    try {
      const { userDecoded } = req.body

      const user = await this.repository.getOne(userDecoded.email)
      if (!user) {
        return res.status(404).send({ message: MSG.USER_NOT_FOUND })
      }

      return res.status(200).json({ user })
    } catch (err: any) {
      return res.status(500).send({ message: err.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { user } = req.body

      const userExists = await this.repository.getOne(user.email)
      if (!userExists) {
        return res.status(404).send({ message: MSG.USER_NOT_FOUND })
      }

      const response = await this.repository.save(user)

      return res.status(201).json({ user: response })
    } catch (err: any) {
      return res.status(500).send({ message: err.message })
    }
  }

  // ------------------------------

  private generateJwtToken(payload: IUserDecoded) {
    const tokenExpires = 60 * 60 * 1 // 1 hour
    const token = jwt.sign(
      {
        ...payload
      },
      SECRET_KEY,
      {
        expiresIn: tokenExpires
      }
    )

    return { token, tokenExpires }
  }
}
