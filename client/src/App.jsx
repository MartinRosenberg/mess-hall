import React, { useState } from 'react'
import socketIO from 'socket.io-client'

import { Event } from 'server/src/Event'

const App = () => {
  const io = socketIO('ws://localhost:4001/')

  // State fields
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState([])

  // Setters
  // username
  const changeUsername = (evt) => setUsername(evt.target.value)
  // message
  const changeMessage = (evt) => setMessage(evt.target.value)
  const sendMessage = (evt) => {
    evt.preventDefault()
    io.emit(Event.MESSAGE, {
      id: Math.random(), // lol
      author: username,
      body: message,
    })
    setMessage('')
  }
  // messages
  const addMessage = message => setChatLog([...chatLog, message])

  // Listeners
  io.on(Event.MESSAGE, (message) => {
    addMessage(message)
  })

  return (
    <>
      <ul id="chatLog">
        {chatLog.map(message => (
          <li key={message.id}>
            {message.author}: {message.body}
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <div>
          <label htmlFor="username">Username{' '}</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={changeUsername}
          />
        </div>
        <div>
          <label htmlFor="message">Message{' '}</label>
          <input
            type="text"
            name="message"
            value={message}
            onChange={changeMessage}
          />
        </div>
        <br/>
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  )
}

export { App }
