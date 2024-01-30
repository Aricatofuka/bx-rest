export interface iBXRestCommentTaskAdd {
  TASKID: number,
  FIELDS: iBXRestAddCommentTaskFields
}

export interface iBXRestAddCommentTaskFields {
  /**
   * Идентификатор пользователя, от имени которого создается комментарий
   */
  AUTHOR_ID: number //
  /**
   *  Текст сообщения
   */
  POST_MESSAGE: string
  /**
   * Массив файлов с диска для прикрепления вида ['n123', ...]
   */
  UF_FORUM_MESSAGE_DOC?: string[]
}
