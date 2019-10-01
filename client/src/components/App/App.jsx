import React, { useState } from 'react'

import { useWebSocket } from '../../customHooks'
import { ChatLog } from '../ChatLog'
import { MessageForm } from '../MessageForm'

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
      <ChatLog messages={messages} />
    </>
  )
}

export { App }
