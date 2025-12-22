import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestTaskElapsedItemHttp } from '../../../typification/rest/task/elapseditem/item'
import { $elapseditem, $getlist, $isactionallowed, $task } from '../../../consts/part-name-methods'
import { map, take } from 'rxjs/operators'
import { BXRestMapTaskElapsedItem } from '../../../map/task/elapseditem'
import { forkJoin, mergeMap, Observable, of, throwError } from 'rxjs'
import { iIsActionAllowedParam } from '../../../typification/rest/task/elapseditem/isActionAllowedParam'
import { BXRestNavvyUser } from '../../user'
import { BXRestNavvyTasks } from '../../tasks'
import { BXRestNavvyDelegateElapsedItem } from '../delegate/elapseditem'
import { iBXRestUser } from '../../../typification/rest/user'
import { iBXRestParamAddElapseditem } from '../../../typification/rest/task/elapseditem/add'
import { BXRestNavvyElapsedItem } from '../elapseditem'
import { iBXRestParamUpdateElapseditem } from '../../../typification/rest/task/elapseditem/update'
import { iBXRestParamDelElapseditem } from '../../../typification/rest/task/elapseditem/del'

export class BXRestNavvyOperationElapsedItem {

  private readonly http = new HttpBXServices()
  private readonly delegate = new BXRestNavvyDelegateElapsedItem()
  private readonly BXRestNavvyUser = new BXRestNavvyUser()
  private readonly BXRestNavvyTasks = new BXRestNavvyTasks()
  // private readonly BXRestNavvyElapsedItem = new BXRestNavvyElapsedItem()

  constructor(private BXRestNavvyElapsedItem: BXRestNavvyElapsedItem) {
  }

  getByInterval(idsUsers: number[], dateStart: Date, dateEnd: Date) {
    const param: iBXRestParamElapseditemGet = {
      ORDER: {
        ID: 'DESC'
      },
      FILTER: {
        USER_ID: idsUsers,
        '>=CREATED_DATE': dateStart.toLocaleString('ru-Ru', {
          timeZoneName: 'short'
        }),
        '<=CREATED_DATE': dateEnd.toLocaleString('ru-Ru', {
          timeZoneName: 'short'
        }),
      }
    }
    return this.delegate.getList(param)
  }

  // TODO: Сделать нормально
  getListByIDTask(ids: number[]) {
    // Работает только потому что "nPageSize: 99999"
    return this.http.branch<iBXRestParamElapseditemGet, iBXRestTaskElapsedItemHttp>
    (
      ids.map(i => {
        return {
          name: this.http.getNameMethod([$task, $elapseditem, $getlist]),
          param: {
            TASKID: i,
            PARAMS: {
              NAV_PARAMS: {
                nPageSize: 99999,
                iNumPage: 1
              }
            }
          }
        }
      })
    ).pipe(
      map(v => {
        if (v && v.length) {
          const res = this.http.mapBranchResultWithoutKey(v)
          return BXRestMapTaskElapsedItem.getList(res)
        }
        return undefined
      })
    )
  }

  checkPermissionAddElapsedTimeToTaskArr(tasks: number[], userCurrent: iBXRestUser | undefined = undefined) {
    let request: Record<number, Observable<boolean>> = Object.assign({}, ...tasks.map(i => {
      return {[i]: this.checkPermissionAddElapsedTimeToTask(i, userCurrent)}
    }))
    return forkJoin(request)
      .pipe(
        take(1),
        mergeMap(v => {
          let forForeach = Object.entries(v).map(([key, value]) => {
            return {id: Number(key), value: value}
          })
          if (forForeach.find(i => i.value === undefined) !== undefined) {
            let forForeachHave = forForeach.filter(i => i.value !== undefined)
            let forForeachNotHave = forForeach.filter(i => i.value === undefined) // тут получаем все id не сохраненных у нас прав
            return this.http.branch<iIsActionAllowedParam, boolean>(
              Object.assign({}, ...forForeachNotHave
                .map(i => i.id)
                .map(i => {
                  return {
                    [i]: {
                      name: this.http.getNameMethod([$task, $elapseditem, $isactionallowed]),
                      param: {
                        TASKID: i,
                        ITEMID: 1,
                        ACTIONID: 1
                      }
                    }
                  }
                }))
            ).pipe(
              map(v => {
                if (v && v.length) {
                  const res: Record<number, boolean> = this.http.mapBranchResult(v)
                  forForeachNotHave = Object.entries(res).map(([key, value]) => {
                    return {id: Number(key), value: value}
                  })
                  return Object.assign(forForeachHave, forForeachNotHave)
                }
                return undefined
              })
            )
          }
          return of(forForeach)
        })
      )
  }

  /**
   * Проверка на возможность добавление записи трека в таску
   *
   * @param idTask
   * @param userCurrent
   */
  checkPermissionAddElapsedTimeToTask(idTask: number, userCurrent: iBXRestUser | undefined = undefined) {
    // let permission = Permission.get()
    // if (permission?.tasks?.length) {
    //   let findTask = permission.tasks.find(i => i.id === idTask)
    //   if (findTask?.permission) {
    //     return of(findTask.permission['ELAPSEDTIME.ADD'])
    //   }
    return ((userCurrent) ? of(userCurrent) : this.BXRestNavvyUser.current().res()).pipe(
      mergeMap(self => {
        if (self) {
          return this.BXRestNavvyTasks.task.getAccess(
            {
              id: idTask,
              users: [self.ID]
            }).res().pipe(
            // tap(v => {
            //   if (v && v[self.ID]) {
            //     Permission.set({
            //       tasks: [{id: idTask, permission: v[self.ID], elapsedItem: []}]
            //     })
            //   }
            // }),
            map(v => {
              return (v && v[self.ID]) ? v[self.ID]['ELAPSEDTIME.ADD'] : false
            }),
          )
        }
        return of(undefined)
      })
    )
    // }

    // return of(undefined)
  }

  /**
   * Проверка на возможность прочтения такски
   *
   * @param idTask
   * @param userCurrent
   */
  checkPermissionReadTask(idTask: number, userCurrent: iBXRestUser | undefined = undefined) {
    // let permission = Permission.get()
    // if (permission?.tasks?.length) {
    //   let findTask = permission.tasks.find(i => i.id === idTask)
    //   if (findTask?.permission) {
    //     return of(findTask.permission.ACCEPT)
    //   }
    //   console.log('idTask', idTask)
    return ((userCurrent) ? of(userCurrent) : this.BXRestNavvyUser.current().res()).pipe(
      mergeMap(self => {
        if (self) {
          return this.BXRestNavvyTasks.task.getAccess(
            {
              id: idTask,
              users: [self.ID]
            }).res().pipe(
            // tap(v => {
            //   if (v && v[self.ID]) {
            //     Permission.set({
            //       tasks: [{id: idTask, permission: v[self.ID], elapsedItem: []}]
            //     })
            //   }
            // }),
            map(v => {
              return (v && v[self.ID]) ? !!v[self.ID] : false // отдельного флага на чтение нет, выходит что если права отдались то и права есть
            }),
          )
        }
        return of(undefined)
      })
    )
    // }
    //
    // return of(undefined)
  }

  /**
   * Законченный метод добавления записи с предварительной проверкой прав
   *
   * TODO: добавить сохранение предварительно проверенных записей
   * @param param
   */
  add(param: iBXRestParamAddElapseditem) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.checkPermissionAddElapsedTimeToTask(param.TASKID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.BXRestNavvyElapsedItem.add(param).res()
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
   * Законченный метод обновления записи с предварительной проверкой прав
   *
   * TODO: добавить сохранение предварительно проверенных записей
   * @param param
   */
  update(param: iBXRestParamUpdateElapseditem) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap((allowedReadTask) => {
        if (allowedReadTask) {
          return this.isAllowedModify(param.TASKID, param.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.BXRestNavvyElapsedItem.update(param).res()
              }
              return throwError(() => new Error('Отсутствуют права на изменение записи затраченного времени'))
            }))
        }
        return throwError(() => new Error('Отсутствуют права на чтение задачи'))
      }))
  }

  // TODO: разобраться что это за ебатня в комментах и вписать нормальной комент если она нужна
  isAllowedModify(idTask: number, idItem: number) {
    // let permission = Permission.get()
    // if (permission?.tasks?.length) {
    //   let findTask = permission.tasks.find(i => i.id === idTask)
    //   if (findTask) {
    //     let find = findTask.elapsedItem.find(i => i.id === idItem)
    //     if (find && find.verified.edit) {
    //       return of(find.edit)
    //     }
    //   }
    // }

    return this.BXRestNavvyElapsedItem.isActionAllowed({
      TASKID: idTask,
      ITEMID: idItem,
      ACTIONID: 2
    }).res()
    //   .pipe(
    //   tap(v => {
    //     if (v !== undefined) {
    //       Permission.setTaskElapsedItem(idTask,
    //         {
    //           id: idItem,
    //           edit: v,
    //           del: false,
    //           verified: {
    //             edit: true,
    //             del: false,
    //           }
    //         })
    //     }
    //   })
    // )
  }

  /**
   * isActionAllowed с фиксом на проверку возможности чтения задачи записи
   * (без проверки даёт ошибку)
   *
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
          return this.BXRestNavvyElapsedItem.isActionAllowed(param).res()
        }
        return throwError(() => new Error('Отсутствуют права на чтение задачи'))
      })
    )
  }


  /**
   * Полноценный метод удаления
   *
   * @param param
   */
  del(param: iBXRestParamDelElapseditem) {
    return this.checkPermissionReadTask(param.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedRemove(param.TASKID, param.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.BXRestNavvyElapsedItem.delete(param).res()
              } else {
                return throwError(() => new Error('Отсутствуют права на удаление записи затраченного времени'))
              }
            }))
        } else {
          return throwError(() => new Error('Отсутствуют права на чтение задачи'))
        }
      })
    )
  }

  private isAllowedRemove(idTask: number, idItem: number) {
    return this.isActionAllowed(
      {
        TASKID: idTask,
        ITEMID: idItem,
        ACTIONID: 3
      })
  }
}
