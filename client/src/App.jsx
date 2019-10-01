import React, { useState } from 'react'

import { ChatLog } from './ChatLog'
import { useWebSocket } from './customHooks'
import { MessageForm } from './MessageForm'

const port = process.env.SERVER_PORT || 4001
const url = `ws://localhost:${port}/`

const App = () => {
  const [messages, setMessages] = useState([])
  const addMessage = (message) => setMessages([...messages, message])

  const socket = useWebSocket(url, { onMessage: addMessage }, { debug: true })

  return (
    <>
      <header>
        <h1>Mess Hall</h1>
      </header>
      <MessageForm onMessage={addMessage} socket={socket}/>
      <ul style={{ padding: 0, listStyleType: `none` }}>
        {console.log(messages)}
        {messages.map(({ author, body, id }) => (
          <li key={id}>
            <strong>{author}:</strong> {body}
          </li>
        ))}
      </ul>
    </>
  )
}

export { App }
