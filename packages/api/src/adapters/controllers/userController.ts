import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { IUserRepository } from '@useCases/IUserRepository'

class UserController {
  repository: IUserRepository

  constructor (repository: IUserRepository) {
    this.repository = repository
  }

  async authenticate (req: Request, res: Response) : Promise<void> {
    try {
      const secretKey = process.env.SECRET_KEY

      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).send({ message: 'Required email and password' })
        return
      }

      const user = await this.repository.getOne(email)

      if (user == null) {
        res.status(404).send({ message: 'User not found' })
        return
      }

      if (!await bcrypt.compare(password, user.password)) {
        res.status(400).send({ message: 'Invalid password' })
        return
      }

      const token = jwt.sign({
        id: user.uid,
        email: user.email,
        password: user.password
      }, secretKey!, {
        expiresIn: 86400 // 24 hours
      })

      res.status(200).json({ user, token })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }

  async register (req: Request, res: Response) : Promise<void> {
    try {
      const { email, password } = req.body

      const user = await this.repository.getOne(email)

      if (user?.email === email) {
        res.status(400).send({ message: 'User is already registered' })
        return
      }

      const hash = await bcrypt.hash(password, 5)

      const response = await this.repository.create({
        ...req.body,
        uid: uuidv4(),
        password: hash,
        createdAt: new Date()
      })

      res.status(201).json({ user: response })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}

export { UserController }