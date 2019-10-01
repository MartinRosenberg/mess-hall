import dotenv from 'dotenv'
import express from 'express'
import WebSocket from 'ws'

import { Event } from './Event'

// dotenv
dotenv.config()

// express
const app = express()

// http
const port = process.env.PORT || 4001
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// WebSocket
const wss = new WebSocket.Server({ server })
wss.on(Event.OPEN, (client, request) => {
  const id = request.headers['sec-websocket-key']

  console.log(`Client ${id} connected`)

  client.on(Event.MESSAGE, (message) => {
    console.log(`Client ${id} sent message:`, JSON.parse(message))
    wss.clients.forEach((c) => {
      if (c !== client && c.readyState === WebSocket.OPEN) {
        c.send(message)
      }
    })
  })

  client.on(Event.CLOSE, () => {
    console.log(`Client ${id} disconnected`)
  })
})
