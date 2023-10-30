export interface iBXRestCommentTaskAdd {
  TASKID: number,
  FIELDS: iBXRestAddCommentTaskFields
}

export interface iBXRestAddCommentTaskFields {
  AUTHOR_ID: number //	Идентификатор пользователя, от имени которого создается комментарий
  POST_MESSAGE: string //	Текст сообщения.
  UF_FORUM_MESSAGE_DOC?: string[] // Массив файлов с диска для прикрепления вида ['n123', ...]
  SECONDS: number // Количество секунд
}
