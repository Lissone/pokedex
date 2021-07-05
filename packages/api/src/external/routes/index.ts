import { Router } from 'express'

import { userRoutes } from './userRoutes'
import { pokemonRoutes } from './pokemonRoutes'

const apiRoutes = Router()

apiRoutes.use('/api/v1/user', userRoutes)
apiRoutes.use('/api/v1/pokemon', pokemonRoutes)

export { apiRoutes }
