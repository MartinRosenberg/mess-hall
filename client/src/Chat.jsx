import Chance from 'chance'
import React, { useState } from 'react'

import { MessageField } from './MessageField'

const useControlledField = (initialValue= ``) => {
  const [value, set] = useState(initialValue)
  return {
    value,
    set,
    clear: () => set(``),
    reset: () => set(initialValue),
    update: (event) => set(event.target.value),
  }
}

const chance = new Chance()
const port = process.env.SERVER_PORT || 4001
const url = `ws://localhost:${port}/`

const Chat = () => {
  const [socket, setSocket] = useState(new WebSocket(url))
  const reconnect = () => setSocket(new WebSocket(url))

  const name = useControlledField(chance.animal())

  const [messages, setMessages] = useState([])
  const addMessage = (message) => setMessages([...messages, message])
  const submitMessage = (messageBody) => {
    // on submitting the MessageField form, send the message, add it to the list and reset the input
    const message = {
      id: chance.guid(),
      author: name.value,
      body: messageBody,
    }
    socket.send(JSON.stringify(message))
    addMessage(message)
  }



  return (
    <div>
      <label>
        Name:{` `}
        <input
          type="text"
          id="name"
          placeholder="What... is your name?"
          value={name.value}
          onChange={name.update}
        />
      </label>
      <MessageField
        ws={socket}
        onSubmitMessage={submitMessage}
      />
      <ul style={{ padding: 0, listStyleType: `none` }}>
        {messages.map(({ author, body, id }) => (
          <li key={id}>
            <strong>{author}:</strong> {body}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Chat }
