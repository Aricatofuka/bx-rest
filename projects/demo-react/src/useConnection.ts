import { useEffect, useState } from 'react'
import {
  applyConnection,
  EMPTY_CONNECTION,
  isConnectionValid,
  loadConnection,
  saveConnection,
  type Connection
} from 'bx-rest-demo-shared'

/** React-обёртка над connection.ts из demo-shared: состояние формы + применение к BXRestSettings. */
export function useConnection() {
  const [connection, setConnection] = useState<Connection>(() => loadConnection() ?? EMPTY_CONNECTION)
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    const saved = loadConnection()
    if (saved && isConnectionValid(saved)) {
      applyConnection(saved)
      setApplied(true)
    }
  }, [])

  const connect = () => {
    if (!isConnectionValid(connection)) return
    applyConnection(connection)
    saveConnection(connection)
    setApplied(true)
  }

  return { connection, setConnection, applied, connect, isValid: isConnectionValid(connection) }
}
