import { iBXRestImDialogGetParam } from './get'

export interface iBXRestImDialogReadParam extends iBXRestImDialogGetParam{
  /**
   * Идентификатор последнего прочитанного сообщения в диалоге
   */
  MESSAGE_ID: number
}

export interface iBXRestImDialogRead {
  /**
   * идентификатор прочитанного диалога
   */
  dialogId: string
  /**
   * идентификатор чата
   */
  chatId: number
  /**
   * кол-во непрочитанных сообщений после выполнения метода
   */
  counter: number
  /**
   * последнее прочитанное сообщение
   */
  lastId: number
}