import 'reflect-metadata'

import './envConfig'

import { app } from './app'

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})