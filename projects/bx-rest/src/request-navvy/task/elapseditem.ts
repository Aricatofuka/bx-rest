import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import { mergeMap, of, tap } from 'rxjs'
import { iBXRestParamElapseditemGet } from '../../typification/rest/task/elapseditem/get'
import { BXRestElapseditem } from '../../request/task/elapseditem'
import { Navvy } from '../../services/navvy'
import { iBXRestParamAddElapseditem } from '../../typification/rest/task/elapseditem/add'
import { Permission } from '../../services/permission'
import { BXRestNavvyUser } from '../user'
import { BXRestNavvyTasks } from '../tasks'
import SnackBarService from '../../services/snack-bar/snack-bar.service'
import { iBXRestParamUpdateElapseditem } from '../../typification/rest/task/elapseditem/update'
import { iIsActionAllowedParam } from '../../typification/rest/task/elapseditem/isActionAllowedParam'
import { iBXRestParamDelElapseditem } from '../../typification/rest/task/elapseditem/del'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyElapseditem {

  constructor(
    private BXRestElapseditem: BXRestElapseditem,
    private BXRestNavvyUser: BXRestNavvyUser,
    private BXRestNavvyTasks: BXRestNavvyTasks,
    private Navvy: Navvy,
    private snackBar: SnackBarService
  ) {
  }

  getList(
    param: iBXRestParamElapseditemGet | undefined = undefined
  ) {
    if (param) {
      if (!param.TASKID && !param.SELECT) {
        param.SELECT = ['*']
      }
      if (!param.TASKID && !param.PARAMS) {
        param.PARAMS = {
          NAV_PARAMS: {
            nPageSize: 50,
            iNumPage: 1
          }
        }
      }
    }
    return this.Navvy.mapAndSnackBarError(
      this.BXRestElapseditem.getList(param),
      'не удалось получить время по задачам'
    )
  }

  add(param: iBXRestParamAddElapseditem) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.checkPermissionReadTask(param.TASKID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.Navvy.mapAndSnackBarError(
                  this.BXRestElapseditem.add(param),
                  'Не удалось добавить запись о времени',
                )
              } else {
                this.snackBar.error('Отсутствуют права добавление записи затраченного времени')
                return of(false)
              }
            }))
        } else {
          this.snackBar.error('Отсутствуют права на чтение задачи')
          return of(false)
        }
      }))
  }

  update(param: iBXRestParamUpdateElapseditem) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedModify(param.TASKID, param.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.Navvy.mapAndSnackBarError(
                  this.BXRestElapseditem.update(param),
                  'Не удалось обновить запись о времени',
                )
              } else {
                this.snackBar.error('Отсутствуют права на изменение записи затраченного времени')
                return of(false)
              }
            }))

        } else {
          this.snackBar.error('Отсутствуют права на чтение задачи')
          return of(false)
        }
      }))
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
  getByInterval(idsUsers: number[], dateStart: Date, dateEnd: Date, cache = false) {
    return this.getAll({
        ORDER: {
          ID: 'DESC'
        },
        FILTER: {
          USER_ID: idsUsers,
          '>=CREATED_DATE': dateStart.toLocaleString('ru-Ru'),
          '<=CREATED_DATE': dateEnd.toLocaleString('ru-Ru'),
        }
      },
      cache
    ).pipe(
      map(v => this.http.mapResult(v))
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
    }).pipe(
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

  isAllowedRemove(idTask: number, idItem: number) {
    return this.isActionAllowed(
      {
        TASKID: idTask,
        ITEMID: 3,
        ACTIONID: idItem
      })
  }

  /**
   * idAction:
   * 1 - ACTION_ELAPSED_TIME_ADD
   * 2 - ACTION_ELAPSED_TIME_MODIFY
   * 3 - ACTION_ELAPSED_TIME_REMOVE
   * @param param
   */
  isActionAllowed(param: iIsActionAllowedParam) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(canRead => {
        if (canRead) {
          this.Navvy.mapAndSnackBarError(this.BXRestElapseditem.isActionAllowed(param), '').pipe(
            catchError(v => {
              console.error(v)
              return of(false)
            })
          )
        }
        return of(false)
      })
    )
  }

  checkPermissionReadTask(idTask: number) {
    let permission = Permission.get()
    if (permission?.tasks?.length) {
      let findTask = permission.tasks.find(i => i.id === idTask)
      if (findTask?.permission) {
        return of(findTask.permission.ACCEPT)
      }
      return this.BXRestNavvyUser.current().pipe(
        mergeMap(self => {
          if (self) {
            return this.BXRestNavvyTasks.task.getaccess(
              {
                id: idTask,
                users: [self.ID]
              }).pipe(
              tap(v => {
                if (v && v[self.ID]) {
                  Permission.set({
                    tasks: [{id: idTask, permission: v[self.ID], elapsedItem: []}]
                  })
                }
              }),
              map(v => {
                return (v && v[self.ID]) ? v[self.ID].ACCEPT : false
              }),
            )
          }
          return of(undefined)
        })
      )
    }

    return of(undefined)
  }

  del(param: iBXRestParamDelElapseditem) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedRemove(param.TASKID, param.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.Navvy.mapAndSnackBarError(this.BXRestElapseditem.del(param), 'Не удалось удалить запись')
                  .pipe(
                    map(v => (v === null)),
                  )
              } else {
                this.snackBar.error('Отсутствуют права на удаление записи затраченного времени')
                return of(false)
              }
            }))
        } else {
          this.snackBar.error('Отсутствуют права на чтение задачи')
          return of(false)
        }
      })
    )
  }

}
