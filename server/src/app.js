import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import socketIO from 'socket.io'

import { Event } from './Event'

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
io.on(Event.CONNECT, (client) => {
  io.emit(Event.CONNECT, client)
  console.log(`Client ${client.id} connected`)

  client.on(Event.MESSAGE, (message) => {
    io.emit(Event.MESSAGE, message)
    console.log(`Received message:`)
    console.table(message)
  })

  client.on(Event.DISCONNECT, () => {
    io.emit(Event.DISCONNECT, client)
    console.log(`Client ${client.id} disconnected`)
  })
})