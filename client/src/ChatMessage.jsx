import PropTypes from 'prop-types'
import React from 'react'

const ChatMessage = ({ author, body }) => (
  <p>
    <strong>{author}:</strong> {body}
  </p>
)

ChatMessage.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

export { ChatMessage }
