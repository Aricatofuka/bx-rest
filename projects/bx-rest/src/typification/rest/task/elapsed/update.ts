export interface iUpdateElapsedTask {
  TASKID: number,
  ITEMID: number,
  ARFIELDS: iUpdateElapsedTaskFields
}

export interface iUpdateElapsedTaskFields {
  SECONDS: number
  COMMENT_TEXT: string
  CREATED_DATE: Date
}
