export interface iBXRestImChatGetParam {
  /**
   * Идентификатор сущности. Может быть использован для поиска чата и для легкого определения контекста в обработчиках событий:
   *
   * ONIMBOTMESSAGEADD
   * ONIMBOTMESSAGEUPDATE
   * ONIMBOTMESSAGEDELETE
   */
  ENTITY_TYPE: string
  /**
   * Числовой идентификатор сущности. Может быть использован для поиска чата и для легкого определения контекста в обработчиках событий:
   *
   * ONIMBOTMESSAGEADD
   * ONIMBOTMESSAGEUPDATE
   * ONIMBOTMESSAGEDELETE
   */
  ENTITY_ID: number
}