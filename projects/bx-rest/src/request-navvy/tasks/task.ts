import { Injectable } from '@angular/core'
import { BXRestTasksTask } from '../../request/tasks/task'
import { iBXRestParamTaskAdd } from '../../typification/rest/tasks/task/add'
import iBXRestParamTaskGet from '../../typification/rest/tasks/task/get'
import { Navvy } from '../../services/navvy'
import { iBXRestParamTasksList } from '../../typification/rest/tasks/task/list'
import { iBXRestParamTaskGetAccess } from '../../typification/rest/task/access/getaccess'
import { BXRestMapTasksTask } from '../../map/tasks/task'
import { iBXRestTaskFieldsName } from '../../typification/rest/tasks/base/fieldsName'
import { BXRestNavvyTasksTaskResult } from './task/result'

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

  private Navvy: Navvy<BXRestTasksTask, BXRestMapTasksTask>

  constructor(
    public result: BXRestNavvyTasksTaskResult,
    private BXRestTasksTask: BXRestTasksTask,
    private BXRestMapTasksTask: BXRestMapTasksTask,

    // private taskResultMap: BitrixApiTaskResultMapServices
  ) {
    this.Navvy = new Navvy(this.BXRestTasksTask, this.BXRestMapTasksTask)
    //  this.storeTask$ = this.store.select('tasks')
    //  this.nowLoad$.next({
    //    total: 0,
    //    next: 0
    //  })
  }

  add(param: { fields: iBXRestParamTaskAdd }) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTask.add,
      param,
      this.BXRestMapTasksTask.add
    )
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

  get(param: iBXRestParamTaskGet<iBXRestTaskFieldsName[]>) {
    if (!param.select) {
      param.select = this.def.select

    }
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTask.get,
      param,
      this.BXRestMapTasksTask.get
    )
  }


  list(param: iBXRestParamTasksList<iBXRestTaskFieldsName[]> = {}) {
    if (!param.select) {
      param.select = this.def.select
    }
    return this.Navvy.PagNavTasks(
      this.BXRestTasksTask.list,
      param,
      this.BXRestMapTasksTask.list
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
    return this.Navvy.simple(
      this.BXRestTasksTask.getFields
    )
  }

  getaccess(param: iBXRestParamTaskGetAccess) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTask.getaccess,
      param,
      this.BXRestMapTasksTask.getaccess
    )
  }

}
