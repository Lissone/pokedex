import { Router } from 'express'

import { loginRoutes } from './loginRoute'

const apiRoutes = Router()

apiRoutes.use('/api/v1/login', loginRoutes)

export { apiRoutes }
