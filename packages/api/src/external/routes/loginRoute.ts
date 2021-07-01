import { Router } from 'express'

export const loginRoutes = Router()

loginRoutes.use('/api/v1/login', (req, res) => res.send({ message: 'Login' }))
