import { iBXRestParamTaskAdd } from '../../typification/rest/tasks/task/add'
import {
  iBXRestParamTasksTaskGet, iBXRestTasksTaskGet, iBXRestTasksTaskGetHttpDefault
} from '../../typification/rest/tasks/task/get'
import { Navvy } from '../../services/navvy'
import { iBXRestParamTasksList } from '../../typification/rest/tasks/task/list'
import { BXRestMapTasksTask } from '../../map/tasks/task'
import { BXRestNavvyTasksTaskResult } from './task/result'
import camelCase from 'just-camel-case'
import {
  iBXRestParamTasksTaskUpdateFields,
  iBXRestTasksTaskFieldsCanUpdate
} from '../../typification/rest/tasks/task/update'
import {
  iBXRestParamTaskGetAccess,
  iBXRestTaskGetAccess,
  iBXRestTaskGetAccessItem
} from '../../typification/rest/task/access/getaccess'
import { iBXRestTaskFieldsName } from '../../typification/rest/tasks/base/fields-name'
import { ToUpperCaseKeys } from '../../typification/base/upper-case-keys'
import { ObjectToSnake } from 'ts-case-convert/lib/caseConvert'
import { AllKeyFree } from '../../typification/base/all-key-free'
import {
  $add,
  $approve,
  $complete,
  $defer,
  $delegate,
  $get, $getaccess,
  $getFields, $list, $result,
  $task,
  $tasks, $update
} from '../../consts/part-name-methods'
import { iBXRestTasksTaskBaseAnswer } from '../../typification/rest/tasks/task/base'
import { iBXRestTask } from '../../typification/rest/tasks/task'
import { iBXRestTasksTaskGetFields } from '../../typification/rest/tasks/task/getFields'
import { iBXRestTasksTaskDeferHttp } from '../../typification/rest/tasks/task/defer'

export class BXRestNavvyTasksTask {

  url = {
    /**
     * Создает задачу
     */
    add: [$tasks, $task, $add],
    /**
     * Позволяет принять задачу
     */
    approve: [$tasks, $task, $approve],
    /**
     * Переводит задачу в статус «завершена»
     */
    complete: [$tasks, $task, $complete],
    // counters: {
    //   /**
    //    * Получает счетчики пользователя
    //    */
    //   get: [$tasks, $task, $counters, $get],
    // },
    /**
     * Переводит задачу в статус «отложена»
     */
    defer: [$tasks, $task, $defer],
    /**
     * Метод для делегирования задачи
     */
    delegate: [$tasks, $task, $delegate],
    /**
     * Возвращает информацию о конкретной задаче
     */
    get: [$tasks, $task, $get],
    // /**
    //  * Удаляет задачу
    //  */
    // delete: [$tasks, $task, $delete],
    // /**
    //  * Позволяет отклонить задачу
    //  */
    // disapprove: [$tasks, $task, $disapprove],
    // favorite: {
    //   /**
    //    * Добавляет задачи в "Избранное"
    //    */
    //   add: [$tasks, $task, $favorite, $add],
    //   /**
    //    * Удаляет задачи из "Избранного"
    //    */
    //   delete: [$tasks, $task, $favorite, $delete],
    // },
    // files: {
    //   /**
    //    * Прикрепляет загруженный на диск файл к задаче
    //    */
    //   attach: [$tasks, $task, $files, $attach],
    // },
    /**
     * Возвращает все доступные поля
     */
    getFields: [$tasks, $task, $getFields],
    /**
     * Метод для проверки доступа к задаче
     */
    getAccess: [$tasks, $task, $getaccess],
    // history: {
    //   /**
    //    * Получает историю задачи
    //    */
    //   list: [$tasks, $task, $history, $list],
    // },
    /**
     * Возвращает массив задач, каждая из которых содержит массив полей
     */
    list: [$tasks, $task, $list],
    // /**
    //  * Останавливает выполнение задачи, переводя ее в статус "ждет выполнения"
    //  */
    // pause: [$tasks, $task, $pause],
    // /**
    //  * Возобновляет задачу после ее завершения
    //  */
    // renew: [$tasks, $task, $renew],
    // /**
    //  * Переводит задачу в статус «выполняется»
    //  */
    // start: [$tasks, $task, $start],
    // /**
    //  * Позволяет наблюдать за задачей
    //  */
    // startWatch: [$tasks, $task, 'startwatch'],
    // /**
    //  * Останавливает наблюдение за задачей
    //  */
    // stopwatch: [$tasks, $task, 'stopwatch'],
    /**
     * Обновляет задачу
     */
    update: [$tasks, $task, $update],
    result: {
      /**
       *  Просмотр списка результатов к задаче
       */
      list: [$tasks, $task, $result, $list],
      /**
       * Создание результата задачи из комментария
       */
      addFromComment: [$tasks, $task, $result, 'addFromComment'],
      /**
       * Удаление результата задачи по комментарию из которого он был создан
       */
      deleteFromComment: [$tasks, $task, $result, 'deleteFromComment'],
    }
  }

  public readonly result = new BXRestNavvyTasksTaskResult()

  private readonly Navvy = new Navvy()

  add<CustomFields extends object = object>(param: iBXRestParamTaskAdd<CustomFields>) {
    return this.Navvy.simple<
      iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskGetHttpDefault>,
      iBXRestTask,
      iBXRestParamTaskAdd<CustomFields>
    >(
      this.url.add,
      param,
      BXRestMapTasksTask.add
    )
  }

  // TODO: переписать нормально
  update<CustomFields extends object>(
    task: AllKeyFree<iBXRestTasksTaskGet<iBXRestTaskFieldsName[], CustomFields>>,
    updateFields: (iBXRestTasksTaskFieldsCanUpdate | keyof ToUpperCaseKeys<ObjectToSnake<CustomFields>>)[]
  ) {

    let sendTask: iBXRestParamTasksTaskUpdateFields & AllKeyFree<CustomFields> = {}
    let taskTS: Record<string, any> = task
    if (updateFields.length) {
      for (let updateField of updateFields) {
        const key = String(updateField)
        if (taskTS[camelCase(key)]) {
          // @ts-ignore
          sendTask[key] = taskTS[camelCase(key)]
        }
      }
      // @ts-ignore
      if (Object.values(sendTask).length && task && task.id) {
        return this.Navvy.simple<
          iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskDeferHttp>,
          iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskDeferHttp>,
          any
        >(this.url.update, {taskId: task.id, fields: sendTask})
      }
    }

    throw new Error('updateFields empty')
  }

  get<S extends iBXRestTaskFieldsName[], CustomFields extends object = object>(param: iBXRestParamTasksTaskGet<CustomFields>) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapTasksTask.get<S, CustomFields>
    )
  }

  // Возможно можно обойтись без "S extends iBXRestTaskFieldsName[]",
  // надо что бы понять то как генерировать интейфейс на лету исходя их входящих данных
  list<S extends iBXRestTaskFieldsName[], CustomFields extends object = object>(
    param: iBXRestParamTasksList<CustomFields> = {}
  ) {
    return this.Navvy.PagNavTasks(
      this.url.list,
      param,
      BXRestMapTasksTask.list<S, CustomFields>
    )
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
  */

  getFields() {
    return this.Navvy.simple<iBXRestTasksTaskGetFields>(
      this.url.getFields
    )
  }

  getAccess(param: iBXRestParamTaskGetAccess) {
    return this.Navvy.simple<iBXRestTaskGetAccess, {
      [key: number]: iBXRestTaskGetAccessItem
    }, iBXRestParamTaskGetAccess>(
      this.url.getAccess,
      param,
      BXRestMapTasksTask.getAccess
    )
  }

}
