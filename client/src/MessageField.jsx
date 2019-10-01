import React from 'react'
import PropTypes from 'prop-types'

import { useControlledField } from './customHooks'

const MessageField = ({ onSubmitMessage }) => {
  const { value, update, reset } = useControlledField()

  const onSubmit = (event) => {
    event.preventDefault()
    onSubmitMessage(value)
    reset()
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Message:{` `}
        <input
          id="message"
          type="text"
          placeholder="What is your favorite color?"
          value={value}
          onChange={update}
        />
      </label>
      <input type="submit" value="Send" />
    </form>
  )
}

MessageField.propTypes = {
  onSubmitMessage: PropTypes.func.isRequired,
}

export { MessageField }
