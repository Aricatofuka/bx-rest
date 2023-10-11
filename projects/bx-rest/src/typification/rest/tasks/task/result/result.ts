export interface iBXRestTasksTaskResult extends iBXRestTasksTaskResultBase{
  createdAt: Date,
  updatedAt: Date
}

export interface iBXRestTasksTaskResultHttp extends iBXRestTasksTaskResultBase {
  createdAt: string
  updatedAt: string
}

 interface iBXRestTasksTaskResultBase {
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
