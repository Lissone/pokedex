import { Router } from 'express'

import { AuthMiddleware } from '@middlewares/authMiddleware'

import { UserRepository } from '@repositories/userRepository'

import { UserController } from '@controllers/userController'

// -------------------------------------------------------------------

export const userRoutes = Router()

const userRepository = new UserRepository()
const userController = new UserController(userRepository)

// ------------------------------

userRoutes.post('/authenticate', (req, res) => userController.authenticate(req, res))
userRoutes.post('/register', (req, res) => userController.register(req, res))

userRoutes.get('/recover', AuthMiddleware, (req, res) => userController.recoverInformation(req, res))
userRoutes.put('/', AuthMiddleware, (req, res) => userController.update(req, res))
