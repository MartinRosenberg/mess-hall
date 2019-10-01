import Chance from 'chance'
import React from 'react'

import { useInput } from './customHooks'

const chance = new Chance()

const MessageForm = ({ socket, onMessage: handleMessage }) => {
  const name = useInput(chance.animal())
  const message = useInput()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      id: chance.guid(),
      author: name.value,
      body: message.value,
    }
    socket.send(JSON.stringify(data))
    handleMessage(data)
    message.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{` `}
        <input type="text" {...name.bind} />
      </label>
      <label>
        Message:{` `}
        <input type="text" {...message.bind} />
      </label>
      <input type="submit" value="Send" />
    </form>
  )
}

export { MessageForm }
