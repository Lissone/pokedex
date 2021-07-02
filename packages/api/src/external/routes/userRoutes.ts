import { Router } from 'express'

import { UserRepository } from '@repositories/userRepository'
import { UserController } from '@controllers/userController'

const userRepository = new UserRepository()
const userController = new UserController(userRepository)

const userRoutes = Router()

userRoutes.post('/authenticate', (req, res) => userController.authenticate(req, res))
userRoutes.post('/register', (req, res) => userController.register(req, res))

export { userRoutes }
