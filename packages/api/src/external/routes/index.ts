import { Router } from 'express'

import { pokemonRoutes } from './pokemonRoutes'
import { userRoutes } from './userRoutes'

// -------------------------------------------------------------------

export const apiRoutes = Router()

// ------------------------------

apiRoutes.use('/api/v1/user', userRoutes)
apiRoutes.use('/api/v1/pokemon', pokemonRoutes)
