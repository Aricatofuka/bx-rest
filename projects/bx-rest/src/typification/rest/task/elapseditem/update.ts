export interface iBXRestParamUpdateElapseditem {
  TASKID: number,
  ITEMID: number,
  ARFIELDS: iBXRestParamElapsedTaskFields
}

export interface iBXRestParamElapsedTaskFields {
  SECONDS: number
  COMMENT_TEXT: string
  CREATED_DATE: Date
}
