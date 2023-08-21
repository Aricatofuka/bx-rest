export interface iAddElapsedTask {
  TASKID: number,
  FIELDS: iAddElapsedTaskFields
}

export interface iAddElapsedTaskFields {
  SECONDS: number
  COMMENT_TEXT: string
  USER_ID: number
  CREATED_DATE: Date
}
