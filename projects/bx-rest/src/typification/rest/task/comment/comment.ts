export interface iCommentTask extends iCommentTaskBase {
  ATTACHED_OBJECTS?: iCommentTaskFile[],
  AUTHOR_ID: number
  ID: number
  POST_DATE: Date,
}

export interface iCommentTaskHtml extends iCommentTaskBase {
  ATTACHED_OBJECTS?: {
    [key: number]: iCommentTaskFileHtml
  }
  AUTHOR_ID: string
  ID: string
  POST_DATE: string
}

interface iCommentTaskBase {
  AUTHOR_EMAIL: string
  AUTHOR_NAME: string
  POST_MESSAGE: string,
  POST_MESSAGE_HTML: null | string
}

export interface iCommentTaskFile extends iCommentTaskFileBase {
  ATTACHMENT_ID: number
  FILE_ID: number
  SIZE: number
}

export interface iCommentTaskFileHtml extends iCommentTaskFileBase {
  ATTACHMENT_ID: string
  FILE_ID: string
  SIZE: string
}

interface iCommentTaskFileBase {
  DOWNLOAD_URL: string
  NAME: string
  VIEW_URL: string
}
