import app from './app'
import mongoose from 'mongoose'
import config from './app/config'
import { Server } from 'http'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

// asynchronuous error handler
process.on('unhandledRejection', () => {
  console.log('Unahandle Rejection in detected, sutting down')

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit()
})

// synchronuous error handler
process.on('uncaughtException', () => {
  console.log('UncaughtException in detected, sutting down')

  process.exit(1)
})
