import 'reflect-metadata'

import './envConfig'
import { database } from './services/firebase'

import { app } from './app'

const port = process.env.PORT || 5000

database.collection('Users').get().then(() => {
  console.log('Connected to Firebase')
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
