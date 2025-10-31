import { iBXRestYesNo } from '../../base/yes-no'

export interface iBXRestImChatMuteParam {
  /** Идентификатор чата */
  CHAT_ID: number

  /**
   * Варианты ключа MUTE: Y для отключения уведомлений и N для включения
   */
  /** Идентификатор чата */
  MUTE: iBXRestYesNo
}