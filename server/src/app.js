import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import socketIO from 'socket.io'

// dotenv
dotenv.config()

// express
const app = express()
app.use(cors()) // Not for production use

// http
const port = process.env.PORT || 4001
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// socket.io
const io = socketIO(server)
io.on(`connection`, (client) => {
  console.log(`Client ${client.id} connected`)

  client.on(`disconnect`, () => {
    console.log(`Client ${client.id} disconnected`)
  })
})
