export interface iTaskResult extends iTaskResultBase{
  createdAt: Date,
  updatedAt: Date
}

export interface iTaskResultHttp extends iTaskResultBase{
  createdAt: string
  updatedAt: string
}

 interface iTaskResultBase {
  commentId: number,
  createdBy: number,
  fileInfo: null, // ???
  files: number[],
  formattedText: string,
  id: number,
  status: number,
  taskId: number,
  text: string
}
