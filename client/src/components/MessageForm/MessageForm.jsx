import Chance from 'chance'
import PropTypes from 'prop-types'
import React from 'react'

import { useInput } from '../../customHooks'

const chance = new Chance()

const MessageForm = ({ socket, onMessage: handleMessage }) => {
  const nameState = useInput()
  const messageState = useInput()

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = {
      id: chance.guid(),
      author: nameState.value,
      body: messageState.value,
    }
    socket.send(JSON.stringify(message))
    handleMessage(message)
    messageState.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{` `}
        <input type="text" {...nameState.bind} />
      </label>
      <label>
        Message:{` `}
        <input type="text" {...messageState.bind} />
      </label>
      <input type="submit" value="Send" />
    </form>
  )
}


MessageForm.propTypes = {
  socket: PropTypes.instanceOf(WebSocket).isRequired,
}

export { MessageForm }
