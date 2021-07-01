import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { apiRoutes } from './routes'

const app = express()

app.disable('x-powered-by')

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token'
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: true
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(options))

app.use(apiRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'API' })
})

export { app }