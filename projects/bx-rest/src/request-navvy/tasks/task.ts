import { Injectable } from '@angular/core'
import { BXRestTasksTask } from '../../request/tasks/task'
import { iBXRestParamTaskAdd } from '../../typification/rest/tasks/task/add'
import {
  iBXRestParamTasksTaskGet, iBXRestTasksTaskGet
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
import { NavvySimple } from '../../services/Navvy/NavvySimple'
import { of } from 'rxjs'
import { iBXRestParamTaskGetAccess } from '../../typification/rest/task/access/getaccess'
import { iBXRestTaskFieldsName } from '../../typification/rest/tasks/base/fieldsName'
import { ToUpperCaseKeys } from '../../typification/base/upper-case-keys'
import { ObjectToSnake } from 'ts-case-convert/lib/caseConvert'
import { AllKeyFree } from '../../typification/base/all-key-free'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTasksTask {

  private Navvy: Navvy<BXRestTasksTask, BXRestMapTasksTask>

  constructor(
    public result: BXRestNavvyTasksTaskResult,
    private BXRestTasksTask: BXRestTasksTask,
    private BXRestMapTasksTask: BXRestMapTasksTask,
  ) {
    this.Navvy = new Navvy(this.BXRestTasksTask, this.BXRestMapTasksTask)
  }

  add(param: { fields: iBXRestParamTaskAdd }) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTask.add,
      param,
      this.BXRestMapTasksTask.add
    )
  }

  // TODO: переписать нормально
  update<CustomFields extends object>(task: iBXRestTasksTaskGet<iBXRestTaskFieldsName[], CustomFields>, updateFields: (iBXRestTasksTaskFieldsCanUpdate | keyof ToUpperCaseKeys<ObjectToSnake<CustomFields>>)[]) {
    const func = () => {
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
          // @ts-ignore
          return this.BXRestTasksTask.update({taskId: task.id, fields: sendTask})
        }
      }
      return of(undefined)
    }

    return new NavvySimple(this, this.BXRestMapTasksTask, func.call(this))
  }

  get<S extends iBXRestTaskFieldsName[], CustomFields extends object = {}>(param: iBXRestParamTasksTaskGet<CustomFields>) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTask.get<S, CustomFields>,
      param,
      this.BXRestMapTasksTask.get<S, CustomFields>
    )
  }

  list<S extends iBXRestTaskFieldsName[], CustomFields extends object = {}>(param: iBXRestParamTasksList<CustomFields> = {}) {
    return this.Navvy.PagNavTasks(
      this.BXRestTasksTask.list<S, CustomFields>,
      param,
      this.BXRestMapTasksTask.list<S, CustomFields>
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

  getAccess(param: iBXRestParamTaskGetAccess) {
    return this.Navvy.simpleWithArg(
      this.BXRestTasksTask.getAccess,
      param,
      this.BXRestMapTasksTask.getAccess
    )
  }

}
