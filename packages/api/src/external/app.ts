import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

// eslint-disable-next-line import/extensions
import * as swaggerDocument from '../swagger.json'
import { apiRoutes } from './routes'

// -------------------------------------------------------------------

export const app = express()

app.disable('x-powered-by')

const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: true
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(options))

app.use(apiRoutes)

app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
