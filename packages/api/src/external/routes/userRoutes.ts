import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { UserRepository } from '@repositories/userRepository'
import { UserController } from '@controllers/userController'

const userRepository = new UserRepository()
const userController = new UserController(userRepository)

const userRoutes = Router()

userRoutes.post('/authenticate', (req, res) => userController.authenticate(req, res))
userRoutes.post('/register', (req, res) => userController.register(req, res))

userRoutes.post('/test', AuthMiddleware, (req, res) => res.send({ message: 'Test middleware' }))

export { userRoutes }
