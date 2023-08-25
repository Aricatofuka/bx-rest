export interface iBXRestParamAddElapseditem {
  TASKID: number,
  FIELDS: iBXRestParamAddElapsedTaskFields
}

export interface iBXRestParamAddElapsedTaskFields {
  SECONDS: number
  COMMENT_TEXT: string
  USER_ID: number
  CREATED_DATE: Date
}
