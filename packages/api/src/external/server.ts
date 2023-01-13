/* eslint-disable no-console */
import 'reflect-metadata'

import './envConfig'
import { app } from './app'
import { database } from './services/firebase'

// -------------------------------------------------------------------

const PORT = process.env.PORT || 5000

database
  .collection('Users')
  .get()
  .then(() => {
    console.log('Connected to Firebase')
  })

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
