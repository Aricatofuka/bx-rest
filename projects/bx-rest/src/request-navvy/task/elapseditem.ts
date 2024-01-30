import { Injectable } from '@angular/core'
import { mergeMap, of, tap, throwError } from 'rxjs'
import { iBXRestParamElapseditemGet } from '../../typification/rest/task/elapseditem/get'
import { BXRestTaskElapsedItem } from '../../request/task/elapseditem'
import { iBXRestParamAddElapseditem } from '../../typification/rest/task/elapseditem/add'
import { Permission } from '../../services/permission'
import { iBXRestParamUpdateElapseditem } from '../../typification/rest/task/elapseditem/update'
import { iIsActionAllowedParam } from '../../typification/rest/task/elapseditem/isActionAllowedParam'
import { iBXRestParamDelElapseditem } from '../../typification/rest/task/elapseditem/del'
import { Navvy } from '../../services/navvy'
import { BXRestMapTaskElapsedItem } from '../../map/task/elapseditem'
import { BXRestNavvyOperationElapsedItem } from './operation/elapseditem'
import { BXRestNavvyDelegateElapsedItem } from './delegate/elapseditem'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyElapsedItem {

  private Navvy: Navvy<BXRestTaskElapsedItem, BXRestMapTaskElapsedItem>

  constructor(
    private BXRestElapsedItem: BXRestTaskElapsedItem,
    private BXRestMapElapsedItem: BXRestMapTaskElapsedItem,
    private delegate: BXRestNavvyDelegateElapsedItem,
    public operation: BXRestNavvyOperationElapsedItem
  ) {
    this.Navvy = new Navvy(this.BXRestElapsedItem, this.BXRestMapElapsedItem)
  }

  /*
  call(methodName: string, ...args: any[]){
    if (typeof this[methodName] === 'function') {
      return this[methodName](...args);
    }
    return this[methodName](...args);
  }
   */

  getList(
    param: iBXRestParamElapseditemGet = {}
  ) {
    return this.delegate.getList(param)
  }

  add(param: iBXRestParamAddElapseditem) {
    return this.operation.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.operation.checkPermissionAddElapsedTimeToTask(param.TASKID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.BXRestElapsedItem.add(param)
              } else {
                return throwError(() => new Error('Отсутствуют права добавление записи затраченного времени'))
              }
            }))
        } else {
          return throwError(() => new Error('Отсутствуют права на чтение задачи'))
        }
      }))
  }

  /**
   * Обновление записи рабочего времени
   *
   * @param param
   */
  update(param: iBXRestParamUpdateElapseditem) {
    return this.Navvy.simple(() => this.operation.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedModify(param.TASKID, param.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.BXRestElapsedItem.update(param)
              } else {
                return throwError(() => new Error('Отсутствуют права на изменение записи затраченного времени'))
              }
            }))
        } else {
          return throwError(() => new Error('Отсутствуют права на чтение задачи'))
        }
      })), this.BXRestMapElapsedItem.update)
  }

  /*
  getAll(
    params: RequestParamsElapsedGetList | undefined = undefined,
    cache = false
  ): Observable<iHttpAnswerBX<BXRestElapsed[]> | undefined> {
    return this.get(params, cache)
      .pipe(
        mergeMap(items => {
          if (items && items.result) {
            if (items.next) {
              params = (params) ? params : {}
              params.PARAMS = {
                NAV_PARAMS: {
                  nPageSize: this.pageSize,
                  iNumPage: items.next / this.pageSize + 1
                }
              }
              return this.getAll(params, cache).pipe(
                map(vEnd => {
                  if (vEnd && vEnd.result && items.result) {
                    return merge(clone(vEnd), {result: [...items.result, ...vEnd.result]})
                  }
                  return items
                })
              )
            }
            return of(items)
          } else {
            return of(undefined)
          }
        })
      )
  }
   */

  /*
  getCacheOff(params: RequestParamsElapsedGetList | undefined = undefined) {
    return this.http.post<iHttpAnswerBX<BXRestElapsedHttp[]> | undefined>
    (this.url.getlist, params, 'не удалось получить время по задачам')
      .pipe(
        map(v => {
          if (v && v.result) {
            const newResult: BXRestElapsed[] = []
            for (let task of v.result) {
              newResult.push(this.elapsedBXMap.AnswerElapsedGetHttpToAnswerElapsedGet(task))
            }
            return extend(v, {result: newResult}) as iHttpAnswerBX<BXRestElapsed[]>
          }
          return undefined
        }),
        tap(v => {
          if (v && params) {
            this.store.dispatch(saveHttpTaskTime({
              filter: clone(params),
              time: v
            }))
          }
        })
      )
  }
  */

  isAllowedModify(idTask: number, idItem: number) {
    let permission = Permission.get()
    if (permission?.tasks?.length) {
      let findTask = permission.tasks.find(i => i.id === idTask)
      if (findTask) {
        let find = findTask.elapsedItem.find(i => i.id === idItem)
        if (find && find.verified.edit) {
          return of(find.edit)
        }
      }
    }

    return this.isActionAllowed({
      TASKID: idTask,
      ITEMID: 2,
      ACTIONID: idItem
    }).result().pipe(
      tap(v => {
        if (v !== undefined) {
          Permission.setTaskElapsedItem(idTask,
            {
              id: idItem,
              edit: v,
              del: false,
              verified: {
                edit: true,
                del: false,
              }
            })
        }
      })
    )
  }

  private isAllowedRemove(idTask: number, idItem: number) {
    return this.isActionAllowed(
      {
        TASKID: idTask,
        ITEMID: 3,
        ACTIONID: idItem
      }).result()
  }

  /**
   * idAction:
   * 1 - ACTION_ELAPSED_TIME_ADD
   * 2 - ACTION_ELAPSED_TIME_MODIFY
   * 3 - ACTION_ELAPSED_TIME_REMOVE
   * @param param
   */
  isActionAllowed(param: iIsActionAllowedParam) {
    return this.Navvy.simple(() => this.operation.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(canRead => {
        if (canRead) {
          return this.BXRestElapsedItem.isActionAllowed(param)
        }
        return throwError(() => new Error('Отсутствуют права на чтение задачи'))
      })
    ))
  }

  del(param: iBXRestParamDelElapseditem) {
    return this.Navvy.simple(() => this.operation.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedRemove(param.TASKID, param.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.BXRestElapsedItem.del(param)
              } else {
                return throwError(() => new Error('Отсутствуют права на удаление записи затраченного времени'))
              }
            }))
        } else {
          return throwError(() => new Error('Отсутствуют права на чтение задачи'))
        }
      })
    ), v => (v === null))
  }

}
