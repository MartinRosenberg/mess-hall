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
      if (debug) console.log(`[server] Disconnected`)
      if (typeof onClose === 'function') onClose(event)
      if (reconnect) setSocket(new WebSocket(url))
    }

    socket.onerror = (event) => {
      if (debug) console.error(`[server] Error thrown`)
      if (typeof onError === 'function') onError(event)
    }

    socket.onmessage = (event) => {
      if (debug) console.log(`[server] Received message: ${event.data}`)
      if (typeof onMessage === 'function') onMessage(event)
    }

    socket.onopen = (event) => {
      if (debug) console.log(`[server] Connected`)
      if (typeof onOpen === 'function') onOpen(event)
    }
  }, [])

  return socket
}

export { useInput, useWebSocket }
