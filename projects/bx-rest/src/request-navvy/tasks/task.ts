import { Injectable } from '@angular/core'
import SnackBarService from '../../services/snack-bar/snack-bar.service'
import { map } from 'rxjs/operators';
import { BXRestTaskMap } from '../../map/task'
import { BXRestTasksTask } from '../../request/tasks/task'
import { iBXRestTaskFieldsName } from '../../typification/rest/task/base/fieldsName'
import { iBXRestParamTaskAdd } from '../../typification/rest/tasks/task/add'
import iBXRestParamTaskGet from '../../typification/rest/tasks/task/get'
import { Navvy } from '../../services/navvy'
import { iBXRestParamTasksList } from '../../typification/rest/tasks/task/list'
import { tap } from 'rxjs';
import { SessionStorage } from '../../services/vanilla/sessionStorage'

// export interface TimeProcess {
//   total: number,
//   next: number
// }


@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTasksTask {

  // pageSize = 50
  // nowLoad$ = new ReplaySubject<TimeProcess>(1)

  def: { select: iBXRestTaskFieldsName[] } = {
    select: ['ID', 'PARENT_ID', 'TITLE', 'DESCRIPTION', 'MARK', 'PRIORITY', 'STATUS', 'MULTITASK',
      'GROUP_ID', 'STAGE_ID', 'CREATED_BY', 'CREATED_DATE', 'RESPONSIBLE_ID', 'ACCOMPLICES', 'AUDITORS',
      'CHANGED_BY', 'CHANGED_DATE', 'STATUS_CHANGED_DATE', 'CLOSED_BY', 'CLOSED_DATE', 'DATE_START', 'VIEWED_DATE',
      'DEADLINE', 'START_DATE_PLAN', 'END_DATE_PLAN', 'FORKED_BY_TEMPLATE_ID', 'TIME_ESTIMATE', 'TIME_SPENT_IN_LOGS',
      'TAGS', 'ALLOW_TIME_TRACKING'
    ]
  }

  // storeTask$: Observable<iStoreTask>

  constructor(
    private BXRestTasksTask: BXRestTasksTask,
    private snackBar: SnackBarService,
   //  private store: Store<{ tasks: IStoreTask }>,
    private taskMap: BXRestTaskMap,
   // private taskResultMap: BitrixApiTaskResultMapServices
    private Navvy: Navvy,
  ) {
   //  this.storeTask$ = this.store.select('tasks')
   //  this.nowLoad$.next({
   //    total: 0,
   //    next: 0
   //  })
  }

  add(param: { fields: iBXRestParamTaskAdd }) {
    return this.Navvy.mapAndSnackBarError(this.BXRestTasksTask.add(param), 'Не удалось получить задачу').pipe(
      map(v => {
        if (v && v.task) {
          return this.taskMap.add(v.task)
        }
        return undefined
      }
    ))
    // return this.http.post<{ task: TaskBXHttp }>(this.url.add, {fields: param}).pipe(
    //   map(v => {
    //       if (v && v.result && v.result.task) {
    //         return Object.assign(
    //           v,
    //           {
    //             result: this.taskBXMap.TaskBXHttpToTaskBX(v.result.task)
    //           })
    //       }
    //       return undefined
    //     }
    //   ))
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
    if (!requestArray.select) {
      requestArray.select = this.def.select
    }
    return this.Navvy.mapAndSnackBarError(this.BXRestTasksTask.get(requestArray), 'Не удалось получить задачу').pipe(
      map(v => (v && v.task) ? v.task : undefined),
      map(v => (v) ? this.taskMap.get(v) : undefined)
    )
  }


  list(param: iBXRestParamTasksList = {}) {
    if (!param.select) {
      param.select = this.def.select
    }
    return this.Navvy.mapAndSnackBarError(this.BXRestTasksTask.list(param), 'Не удалось получить задачи').pipe(
      map(v => (v && v.tasks) ? v.tasks : undefined),
      map(v => (v) ? this.taskMap.list(v) : undefined),
      tap(v => {
          if (v) {
            SessionStorage.setItem(this.constructor.name + this.list.name, v)
          }
        }
      )
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

  getPlannerList() {
    return this.http.post<iHttpAnswerBX<(string | number)[]>>(this.url.planner.getlist)
  }

  getaccess(id: number, users: number[] = []) {
    return this.http.post<iHttpAnswerBX<iGetAccessTask>>(this.url.getaccess, {taskId: id, user: users})
      .pipe(
        map(v => this.http.mapResult(v)),
        map(v => (v && v.allowedActions) ? v.allowedActions : undefined)
      )
  }
   */
}