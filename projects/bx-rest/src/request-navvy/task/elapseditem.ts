import { Injectable } from '@angular/core'
import {
  $add,
  $delete,
  $elapseditem,
  $get,
  $getlist,
  $getmanifest,
  $isactionallowed,
  $task, $update
} from '../../consts/part-name-metods'
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyElapseditem {

  url = {
    getmanifest: [$task, $elapseditem, $getmanifest], // Возвращает список методов и их описание
    getlist: [$task, $elapseditem, $getlist], // Возвращает список записей о затраченном времени по задаче
    get: [$task, $elapseditem, $get], // Возвращает запись о затраченном времени по ее идентификатору
    add: [$task, $elapseditem, $add], // Добавляет затраченное время к задаче
    delete: [$task, $elapseditem, $delete], // Удаляет запись о затраченном времени
    isactionallowed: [$task, $elapseditem, $isactionallowed], // Проверяет разрешено ли действие
    update: [$task, $elapseditem, $update], // Изменяет параметры записи о затраченном времени
  }

  savedPermission$ = this.store.select('PermissionElapsedItemTask')
  storeTask$: Observable<IStoreTask>

  constructor(
    private http: HttpBXServices,
    private snackBar: SnackBarService,
    private tasksBXServ: TasksBXServices,
    private userBXServ: UserBXServices,
    private elapsedBXMap: ElapsedBXMapServices,
    private store: Store<{ PermissionElapsedItemTask: iSavePermissionElapsedItemTask[], tasks: IStoreTask }>,
  ) {
    this.storeTask$ = this.store.select('tasks')
  }

  get(
    params: RequestParamsElapsedGetList | undefined = undefined,
    cache = false
  ): Observable<iHttpAnswerBX<BXRestElapsed[]> | undefined> {
    if (params) {
      if (!params.TASKID && !params.SELECT) {
        params.SELECT = ['*']
      }
      if (!params.TASKID && !params.PARAMS) {
        params.PARAMS = {
          NAV_PARAMS: {
            nPageSize: 50,
            iNumPage: 1
          }
        }
      }
      if (cache) {
        return this.storeTask$.pipe(
          take(1),
          map(v => {
            if (v) {
              return v.data.http.time.find(i => compare(i.filter, params))
            } else {
              return undefined
            }
          })
        ).pipe(
          concatMap(v => {
            if (v && v.time.result) {
              return of(v.time)
            } else {
              return this.getCacheOff(params)
            }
          }))
      } else {
        return this.getCacheOff(params)
      }
    } else {
      this.snackBar.error('Фильтр не может быть пустым')
      return of(undefined)
    }
  }

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

  getByIDs(ids: number[]): Observable<BXRestElapsed[] | undefined> {
    return this.http.branch<RequestParamsElapsedGetList, BXRestElapsedHttp>
    (
      ids.map(i => {
        return {
          name: this.http.getNameMethod([$task, $elapseditem, $getlist]),
          param: {
            TASKID: i
          }
        }
      })
    ).pipe(
      map(v => {
        if (v && v.length) {
          return this.http.mapBranchResultWithoutKey(v).map(
            i => this.elapsedBXMap.AnswerElapsedGetHttpToAnswerElapsedGet(i)
          )
        }
        return undefined
      })
    )

  }

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

  add(data: iAddElapsedTask) {
    return this.checkPermissionReadTask(data.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedAdd(data.TASKID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.http.post<iHttpAnswerBX<number>>(
                  this.url.add,
                  data,
                  'Не удалось добавить запись о времени',
                  {
                    timeZone: {
                      calc: false,
                      levelOut: false
                    }
                  }
                ).pipe(
                  map(v => this.http.mapResult(v))
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

  update(data: iUpdateElapsedTask) {
    return this.checkPermissionReadTask(data.TASKID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedModify(data.TASKID, data.ITEMID).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.http.post<iHttpAnswerBX<null>>
                (
                  this.url.update,
                  data,
                  'Не удалось обновить запись о времени',
                  {
                    timeZone: {
                      calc: false,
                      levelOut: false
                    }
                  }
                ).pipe(
                  map(v => !!(v && v.result === null)),
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

  isAllowedAddFromStore(idTask: number) {
    return this.savedPermission$.pipe(
      take(1),
      map(v => {
        let find = v.find(i => i.permission.verified.addElapsed && i.task === idTask)
        if (find) {
          return find.permission.addElapsed
        }
        return undefined
      })
    )
  }

  isAllowedAdd(idTask: number) {
    return this.isAllowedAddFromStore(idTask).pipe(
      mergeMap(v => {
        if (v === undefined) {
          return this.isActionAllowed(idTask, 1)
            .pipe(
              tap(v => {
                if (v !== undefined) {
                  this.store.dispatch(savePermissionTaskAddElapsedItem(
                    {id: idTask, permission: v})
                  )
                }
              })
            )
        }
        return of(v)
      })
    )
  }

  isAllowedAddArr(tasks: TaskBX[]) {
    const res = tasks.reduce((res, option) => {
      if (option.id) {
        res.push(option.id)
      }
      return res
    }, [] as number[])


    let request: { [key: number]: Observable<boolean> } = Object.assign({}, ...res.map(i => {
      return {[i]: this.isAllowedAddFromStore(i)}
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
                  const res: { [p: number]: boolean } = this.http.mapBranchResult(v)
                  forForeachNotHave = Object.entries(res).map(([key, value]) => {
                    return {id: Number(key), value: value}
                  })
                  return Object.assign(forForeachHave, forForeachNotHave)
                }
                return undefined
              }),
              tap(permissionsAdd => {
                if (permissionsAdd) {
                  for (let permission of permissionsAdd) {
                    this.store.dispatch(savePermissionTaskAddElapsedItem(
                      {id: permission.id, permission: permission.value})
                    )
                  }
                }
              })
            )
          }
          return of(forForeach)
        })
      )
  }

  isAllowedModify(idTask: number, idItem: number) {
    return this.savedPermission$.pipe(
      take(1),
      mergeMap(v => {
        let findTask = v.find(i => i.task === idTask)
        if (findTask) {
          let find = findTask.permission.elapsedItem.find(i => i.id === idItem)
          if (find && find.permission.verified.edit) {
            return of(find.permission.edit)
          }
        }
        return this.isActionAllowed(idTask, 2, idItem)
          .pipe(
            tap(v => {
              if (v !== undefined) {
                this.store.dispatch(savePermissionTaskUpdateElapsedItem(
                  {idTask: idTask, idItem: idItem, permission: v}
                ))
              }
            })
          )
      }),
    )
  }

  isAllowedRemove(idTask: number, idItem: number) {
    return this.isActionAllowed(idTask, 3, idItem)
  }

  /**
   * idAction:
   * 1 - ACTION_ELAPSED_TIME_ADD
   * 2 - ACTION_ELAPSED_TIME_MODIFY
   * 3 - ACTION_ELAPSED_TIME_REMOVE
   * idItem - обязателен в конечной отправке но не обязателен для ACTION_ELAPSED_TIME_ADD,
   * поэтому этом методе он стоит по дефелту
   * этому методу почему-то важен порядок отправляемых атрибутов
   * @param idTask
   * @param idAction
   * @param idItem
   */
  isActionAllowed(idTask: number, idAction: 1 | 2 | 3, idItem: number = 1) {
    return this.checkPermissionReadTask(idTask).pipe(
      mergeMap(v => {
        if (v) {
          return this.http.post<iHttpAnswerBX<boolean>>(this.url.isactionallowed, {
            TASKID: idTask,
            ITEMID: idItem,
            ACTIONID: idAction
          }).pipe(
            map(v => this.http.mapResult(v))
          )
        }
        return of(false)
      })
    )
  }

  checkPermissionReadTask(idTask: number) {
    return this.savedPermission$.pipe(
      take(1),
      mergeMap(v => {
        let findTask = v.find(i => i.task === idTask)
        if (findTask) {
          if (findTask.permission.verified.read) {
            return of(findTask.permission.read)
          }
        }
        return this.userBXServ.getSelf().pipe(
          mergeMap(self => {
            if (self) {
              return this.tasksBXServ.getaccess(idTask, [self.ID]).pipe(
                map(v => {
                  return !!(v && v[self.ID])
                }),
                tap(v => {
                  this.store.dispatch(savePermissionTaskRead(
                    {id: idTask, permission: v}
                  ))
                })
              )
            }
            return of(undefined)
          })
        )

      })
    )
  }

  del(taskID: number, id: number) {
    return this.checkPermissionReadTask(taskID).pipe(
      mergeMap(allowedReadTask => {
        if (allowedReadTask) {
          return this.isAllowedRemove(taskID, id).pipe(
            mergeMap(allowed => {
              if (allowed) {
                return this.http.post<iHttpAnswerBX<null>>(
                  this.url.delete,
                  {TASKID: taskID, ITEMID: id},
                  'Не удалось удалить запись'
                ).pipe(
                  map(v => !!(v && v.result === null)),
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
