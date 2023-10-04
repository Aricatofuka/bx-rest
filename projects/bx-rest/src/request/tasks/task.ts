import { Injectable } from '@angular/core'
import {
  $add, $approve, $attach, $complete, $counters, $defer, $delegate, $delete, $disapprove, $favorite, $files,
  $get, $getaccess, $getFields, $getlist, $history, $list, $pause, $planner, $renew, $result, $start,
  $task, $tasks, $update
} from '../../consts/part-name-metods'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestHttpTask } from '../../typification/rest/task/task'
import { iBXRestParamTaskAdd } from '../../typification/rest/tasks/task/add'
import iBXRestParamTaskGet from '../../typification/rest/tasks/task/get'
import { iBXRestParamTasksList, iBXRestParamTasksListHttp } from '../../typification/rest/tasks/task/list'
import { iBXRestParamTaskGetAccess, iBXRestTaskGetAccess } from '../../typification/rest/task/access/getaccess'
import { iBXRestTasksTaskApproveHttp } from '../../typification/rest/tasks/task/approve'
import { iBXRestTasksTaskCompleteHttp } from '../../typification/rest/tasks/task/complete'
import { iBXRestTasksTaskDeferHttp } from '../../typification/rest/tasks/task/defer'

@Injectable({
  providedIn: 'root'
})
export class BXRestTasksTask {

  url = {
    add: [$tasks, $task, $add], // Создает задачу
    approve: [$tasks, $task, $approve], // Позволяет принять задачу
    complete: [$tasks, $task, $complete], // Переводит задачу в статус «завершена»
    counters: {
      get: [$tasks, $task, $counters, $get], //Получает счетчики пользователя
    },
    defer: [$tasks, $task, $defer], // Переводит задачу в статус «отложена»
    delegate: [$tasks, $task, $delegate], // Метод для делегирования задачи
    delete: [$tasks, $task, $delete], // Удаляет задачу
    disapprove: [$tasks, $task, $disapprove], // Позволяет отклонить задачу
    favorite: {
      add: [$tasks, $task, $favorite, $add], // Добавляет задачи в "Избранное"
      delete: [$tasks, $task, $favorite, $delete], // Удаляет задачи из "Избранного"
    },
    files: {
      attach: [$tasks, $task, $files, $attach], // Прикрепляет загруженный на диск файл к задаче
    },
    get: [$tasks, $task, $get], // Возвращает информацию о конкретной задаче
    getFields: [$tasks, $task, $getFields], // Возвращает все доступные поля
    getaccess: [$tasks, $task, $getaccess], // Метод для проверки доступа к задаче
    history: {
      list: [$tasks, $task, $history, $list], // Получает историю задачи
    },
    list: [$tasks, $task, $list], // Возвращает массив задач, каждая из которых содержит массив полей
    pause: [$tasks, $task, $pause], // Останавливает выполнение задачи, переводя ее в статус "ждет выполнения"
    renew: [$tasks, $task, $renew], // Возобновляет задачу после ее завершения
    start: [$tasks, $task, $start], // Переводит задачу в статус «выполняется»
    startwatch: [$tasks, $task, 'startwatch'], // Позволяет наблюдать за задачей
    stopwatch: [$tasks, $task, 'stopwatch'], // Останавливает наблюдение за задачей
    update: [$tasks, $task, $update], // Обновляет задачу
    result: {
      list: [$tasks, $task, $result, $list], // Просмотр списка результатов к задаче
      addFromComment: [$tasks, $task, $result, 'addFromComment'], // Создание результата задачи из комментария
      deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'], // Удаление результата задачи по комментарию из которого он был создан
    },
    planner: {
      getlist: [$task, $planner, $getlist], // Возвращает массив, содержащий идентификаторы задач в плане на день
    }
  }

  constructor(
    private http: HttpBXServices
  ) {
  }

  add(param: { fields: iBXRestParamTaskAdd }) {
    return this.http.post<{ task: iBXRestHttpTask }>(this.url.add, param)
  }

  approve(id: number) {
    return this.http.post<{ task: iBXRestTasksTaskApproveHttp }>(this.url.approve, {taskId: id})
  }

  complete(id: number) {
    return this.http.post<{ task: iBXRestTasksTaskCompleteHttp }>(this.url.complete, {taskId: id})
  }

  defer(id: number) {
    return this.http.post<{ task: iBXRestTasksTaskDeferHttp }>(this.url.defer, {taskId: id})
  }

  /*
  update(taskId: number, updateFields: iBXRestTaskFieldsName[], task: iBXRestTask) {
    let sendTask: Record<string, any> = {}
    let taskTS: Record<string, any> = task
    if (updateFields.length) {
      for (let updateField of updateFields) {
        if (taskTS[camelCase(updateField)]) {
          sendTask[updateField] = taskTS[camelCase(updateField)]
        }
      }
      if (Object.values(sendTask).length) {
        return this.http.post(
          this.url.update,
          {taskId: taskId, fields: sendTask},
          'error to update task')
      } else {
        this.snackBar.error('not valid send data task')
        console.error('not valid send data task', sendTask, task)
        return of(undefined)
      }
    }

    this.snackBar.warning('not have field for update')
    return of(undefined)
  }
  */

  get(requestArray: iBXRestParamTaskGet) {
    return this.http.post<{ task: iBXRestHttpTask | undefined }>(this.url.get, requestArray)
  }

  list(param: iBXRestParamTasksList
    // = {}
  ) {
    return this.http.post<iBXRestParamTasksListHttp>(this.url.list, param)
  }

  /*
  listArray(requestArray: RequestApiTaskListBX = {}) {
    return this.list(requestArray).pipe(
      map(v => this.http.mapResult(v)),
      map(v => (v && v.tasks) ? v.tasks : [])
    )
  }

  listAll(requestArray: RequestApiTaskListBX = {}, cache = false): Observable<TaskBX[]> {
    if (!requestArray.select) {
      requestArray.select = this.def.select
      if (cache) {
        return this.storeTask$.pipe(
          take(1),
          mergeMap(tasks => {
            if (tasks && tasks.data.http.list && requestArray.filter && requestArray.filter.ID) {
              const ids = (typeof requestArray.filter.ID === 'number') ? [requestArray.filter.ID] : requestArray.filter.ID
              let filter = tasks.data.http.list.filter(i => (i.id) ? ids.includes(i.id) : false)
              if (filter.length === ids.length) {
                return of(filter)
              }
            }
            return this.getEndListArray(requestArray)
          })
        )
      }
      return this.getEndListArray(requestArray)
    }
    return this.getEndListArray(requestArray)
  }

  getEndListArray(requestArray: RequestApiTaskListBX): Observable<TaskBX[]> {
    return this.list(requestArray).pipe(
      mergeMap((items: AnswerApiTaskBX | undefined): ObservableInput<any> | Observable<AnswerApiTaskBX[]> => {
        if (items && items.result && typeof items.result.tasks === 'object') {
          const items$ = of(items.result.tasks)
          if (items.next) {
            this.nowLoad$.next({
              total: (items.total) ? items.total : 0,
              next: items.next
            })
            requestArray.start = items.next
            return this.getEndListArray(requestArray).pipe(
              map(vEnd => {
                if (vEnd && items.result.tasks) {
                  return [...items.result.tasks, ...vEnd]
                }
                return (items.result.tasks) ? items.result.tasks : []
              }))
          }
          this.nowLoad$.next({
            total: 0,
            next: 0
          })
          return items$
        } else {
          return of([])
        }
      })
    )
  }

  getFields() {
    return this.storeTask$.pipe(
      mergeMap(v => {
        if (v && !v.data.fields) {
          return this.http.post<iHttpAnswerBX<{ fields: iGetFieldsDescription }>>(this.url.getFields).pipe(
            tap(v => {
              if (v && v.result) {
                this.store.dispatch(saveFields(v.result))
              }
            }),
            map(v => {
              if (v && v.result && v.result.fields) {
                return {result: v.result.fields}
              }

              return undefined
            })
          )
        }
        if (v.data.fields) {
          return of({result: clone<iGetFieldsDescription>(v.data.fields)})
        } else {
          return of(undefined)
        }
      })
    )
  }

  deleteResultFromComment(commentID: number) {
    return this.http.post<iHttpAnswerBX<any>>(this.url.result.deleteFromComment, {commentId: commentID})
  }

  addResultFromComment(commentID: number) {
    return this.http.post<iHttpAnswerBX<iTaskResultHttp>>(this.url.result.addFromComment, {commentId: commentID})
      .pipe(
        map(v => {
          if (v && v.result) {
            this.taskResultMap.iTaskResultHttpToiTaskResult(v.result)
          }
          return undefined
        }))
  }

  getResulList(taskId: number): Observable<iTaskResult[] | undefined> {
    return this.http.post<iHttpAnswerBX<iTaskResultHttp[]>>(this.url.result.list, {taskId: taskId})
      .pipe(
        map(v => {
          if (v && v.result) {
            return v.result.map(i => this.taskResultMap.iTaskResultHttpToiTaskResult(i))
          }
          return undefined
        }))
  }

  getPlannerList() {s
    return this.http.post<iHttpAnswerBX<(string | number)[]>>(this.url.planner.getlist)
  }
   */

  getaccess(param: iBXRestParamTaskGetAccess) {
    return this.http.post<iBXRestTaskGetAccess>(this.url.getaccess, param)
  }

}

