import { Injectable } from '@angular/core'
import { HttpBXServices } from '../../services/http/HttpBX'
import { iBXRestParamTaskAdd } from '../../typification/rest/tasks/task/add'
import {
  iBXRestTasksTaskGetHttp,
  iBXRestTasksTaskGetHttpDefault
} from '../../typification/rest/tasks/task/get'
import {
  iBXRestParamTasksList, iBXRestTasksTaskListHttp } from '../../typification/rest/tasks/task/list'
import { iBXRestParamTaskGetAccess, iBXRestTaskGetAccess } from '../../typification/rest/task/access/getaccess'
import { iBXRestParamTasksTaskApprove, iBXRestTasksTaskApproveHttp } from '../../typification/rest/tasks/task/approve'
import {
  iBXRestParamTasksTaskComplete,
  iBXRestTasksTaskCompleteHttp
} from '../../typification/rest/tasks/task/complete'
import { iBXRestParamTasksTaskDefer, iBXRestTasksTaskDeferHttp } from '../../typification/rest/tasks/task/defer'
import { BXRestTasksTaskResult } from './task/result'
import { iBXRestParamTasksTaskGet } from '../../typification/rest/tasks/task/get'
import { iBXRestTasksTaskGetFields } from '../../typification/rest/tasks/task/getFields'
import { iBXRestParamTasksTaskUpdate } from '../../typification/rest/tasks/task/update'
import { iBXRestTaskFieldsName } from '../../typification/rest/tasks/base/fieldsName'
import { methods } from '../../typification/base/methods'
import { iBXRestTasksTaskBaseAnswer } from '../../typification/rest/tasks/task/base';

@Injectable({
  providedIn: 'root'
})
export class BXRestTasksTask {

  protected url = methods.tasks.task

  constructor(
    public result: BXRestTasksTaskResult,
    private http: HttpBXServices
  ) {
  }

  add(param: iBXRestParamTaskAdd) {
    return this.http.post<iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskGetHttpDefault>>(this.url.add, param)
  }

  approve(param: iBXRestParamTasksTaskApprove) {
    return this.http.post<iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskApproveHttp>>(this.url.approve, param)
  }

  complete(param: iBXRestParamTasksTaskComplete) {
    return this.http.post<iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskCompleteHttp>>(this.url.complete, param)
  }

  defer(param: iBXRestParamTasksTaskDefer) {
    return this.http.post<iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskDeferHttp>>(this.url.defer, param)
  }

  update(param: iBXRestParamTasksTaskUpdate) {
    return this.http.post<iBXRestTasksTaskBaseAnswer<iBXRestTasksTaskDeferHttp>>(this.url.update, param)
  }

  get<S extends iBXRestTaskFieldsName[], CustomFields extends object = {}>(param: iBXRestParamTasksTaskGet<CustomFields>) {
    return this.http.post<iBXRestTasksTaskGetHttp<S, CustomFields>>(this.url.get, param)
  }

  list<S extends iBXRestTaskFieldsName[], CustomFields extends object = {}>(param: iBXRestParamTasksList<CustomFields>) {
    return this.http.post<iBXRestTasksTaskListHttp<S, CustomFields>>(this.url.list, param)
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
    return this.http.post<iBXRestTasksTaskGetFields>(this.url.getFields)
  }


  getAccess(param: iBXRestParamTaskGetAccess) {
    return this.http.post<iBXRestTaskGetAccess>(this.url.getAccess, param)
  }

}

