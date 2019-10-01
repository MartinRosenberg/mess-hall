import React from 'react'

const ChatLog = ({ messages }) => (
  <ul style={{ padding: 0, listStyleType: `none` }}>
    {messages.map(({ author, body, id }) => (
      <li key={id}>
        <strong>{author}:</strong> {body}
      </li>
    ))}
  </ul>
)

export { ChatLog }
