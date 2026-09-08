// Синглтон-клиент на уровне модуля — паттерн из README «Использование в
// React» (без Context/провайдера, просто общий экземпляр на всё приложение).
// BXRestSettings.update() (см. useConnection.ts) можно звать в любой момент
// до подписки на конкретный запрос — настройки читаются лениво при вызове.
import { BXRestNavvy } from 'bx-rest'

export const bxRest = new BXRestNavvy()
