import { iBXRestYesNo } from '../../../base/yes-no'

export interface iBXRestImDialogRecentUnreadParam {
  /**
   * Идентификатор диалога. Формат:
   *
   * chatXXX – чат получателя, если сообщение для чата
   * XXX – идентификатор получателя, если сообщение для приватного диалога
   */
  DIALOG_ID: string | number

  /** Поставить / снять метку «не прочитан» на диалог - `'Y' */
  ACTION: iBXRestYesNo
}