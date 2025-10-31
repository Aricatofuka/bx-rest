export interface iBXRestImDialogGetParam {
  /**
   * Идентификатор диалога. Формат:
   *
   * chatXXX – чат получателя, если сообщение для чата
   * XXX – идентификатор получателя, если сообщение для приватного диалога
   */
  DIALOG_ID: string | number
}

export interface iBXRestImDialogGet extends iBXRestImDialogGetBase {
  /**
   * идентификатор чата
   */
  id: number
  /**
   * идентификатор пользователя владельца чата
   */
  owner: number
  /**
   * дата создания чата
   */
  date_create: Date
}

export interface iBXRestImDialogGetHttp extends iBXRestImDialogGetBase {
  /**
   * идентификатор чата
   */
  id: string
  /**
   * идентификатор пользователя владельца чата
   */
  owner: string
  /**
   * дата создания чата в формате АТОМ
   */
  date_create: string
}

export interface iBXRestImDialogGetBase {
  /**
   * название чата
   */
  title: string
  /**
   * признак участия в чате внешнего экстранет-пользователя (true/false)
   */
  extranet: boolean
  /**
   * ссылка на аватар (если пусто, значит аватар не задан)
   */
  avatar: string
  /**
   * цвет чата в формате hex TODO: типизировать
   */
  color: string
  /**
   * тип чата (групповой чат, чат для звонка, чат открытой линии и тд)
   */
  type: string
  /**
   * внешний код для чата – тип
   */
  entity_type: string
  /**
   * внешний код для чата – идентификатор
   */
  entity_id: string
  /**
   * нешние данные для чата
   */
  entity_data_1: string
  /**
   * нешние данные для чата
   */
  entity_data_2: string
  /**
   * нешние данные для чата
   */
  entity_data_3: string
  /**
   * тип сообщений чата
   */
  message_type: string
}