import { iBXRestYesNo } from '../../../base/yes-no'

export interface iBXRestImChatUserAddParam {
  /** Идентификатор чата */
  CHAT_ID: number

  /** Идентификаторы новых пользователей*/
  USERS: number[]

  /**
   * Отображение истории переписки для пользователя, которого добавляют в чат этим методом.
   * Y/N - по умолчанию N. Если передать Y, то новый пользователь не будет видеть историю.
   */
  HIDE_HISTORY: iBXRestYesNo
}