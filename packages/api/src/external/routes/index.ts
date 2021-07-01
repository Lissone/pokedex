import { Router } from 'express'

import { userRoutes } from './userRoutes'

const apiRoutes = Router()

apiRoutes.use('/api/v1/user', userRoutes)

export { apiRoutes }
