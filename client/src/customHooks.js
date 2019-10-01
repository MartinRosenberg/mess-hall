import { useEffect, useState } from 'react'

const useInput = (initialValue = ``) => {
  const [value, set] = useState(initialValue)
  return {
    value,
    set,
    reset: () => set(initialValue),
    clear: () => set(``),
    bind: {
      value,
      onChange: event => set(event.target.value),
    }
  }
}

const useWebSocket = (url, handlers = {}, options = {}) => {
  const {
    onClose,
    onError,
    onMessage,
    onOpen,
  } = handlers
  const {
    debug = false,
    reconnect = true,
  } = options

  const [socket, setSocket] = useState(new WebSocket(url))

  useEffect(() => {
    socket.onclose = (event) => {
      const { code, reason } = event
      if (debug) console.log(`[server] Disconnected: ${code} ${reason}`)
      if (typeof onClose === `function`) onClose(code)
      if (reconnect) setSocket(new WebSocket(url))
    }

    socket.onerror = (event) => {
      const { error } = event
      if (debug) console.error(`[server] ${error}`)
      if (typeof onError === `function`) onError(error)
    }

    socket.onmessage = (event) => {
      const { data: message } = event
      if (debug) console.log(`[server] Received message: ${message}`)
      if (typeof onMessage === `function`) onMessage(message)
    }

    socket.onopen = (event) => {
      if (debug) console.log(`[server] Connected`)
      if (typeof onOpen === `function`) onOpen(event)
    }
  }, [])

  return socket
}

export { useInput, useWebSocket }
