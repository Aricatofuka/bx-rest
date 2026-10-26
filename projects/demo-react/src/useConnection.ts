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
  // Валидное сохранённое подключение считается применённым с первого рендера —
  // начальное значение вычисляем здесь, а не через setState в эффекте ниже
  // (это дало бы лишний повторный рендер). EMPTY_CONNECTION всегда невалиден,
  // так что без сохранённого подключения тут false.
  const [applied, setApplied] = useState(() => isConnectionValid(connection))

  // Само применение к BXRestSettings — синхронизация с внешней системой, ему
  // место в эффекте: так возможный тост о сбое хранилища (applyConnection пишет
  // токен в localStorage/cookie) не потеряется — эффект ToastHost, дочернего
  // компонента, к этому моменту уже подписался. React выполняет эффект до
  // обработки первого клика, поэтому «Запустить» не сработает раньше него.
  useEffect(() => {
    const saved = loadConnection()
    if (saved && isConnectionValid(saved)) applyConnection(saved)
  }, [])

  const connect = () => {
    if (!isConnectionValid(connection)) return
    applyConnection(connection)
    saveConnection(connection)
    setApplied(true)
  }

  return { connection, setConnection, applied, connect, isValid: isConnectionValid(connection) }
}
