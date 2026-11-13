import {
  iBXRestParamElapseditemGet,
  iBXRestTaskElapsedItemHttp,
  iBXRestParamTaskGetAccess,
  iBXRestTaskGetAccess,
  iIsActionAllowedParam,
  iBXRestParamAddElapseditem,
  iBXRestParamUpdateElapseditem,
  iBXRestParamDelElapseditem
} from '../../../typification/rest/task'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { $elapseditem, $getaccess, $getlist, $isactionallowed, $task, $tasks } from '../../../consts/part-name-methods'
import { PAGE_SIZE } from '../../../consts/page-size'
import { map, take } from 'rxjs/operators'
import { BXRestMapTaskElapsedItem } from '../../../map/task/elapseditem'
import { mergeMap, Observable, of, throwError } from 'rxjs'
import { BXRestNavvyUser } from '../../user'
import { BXRestNavvyTasks } from '../../tasks'
import { BXRestNavvyDelegateElapsedItem } from '../delegate/elapseditem'
import { iBXRestUser } from '../../../typification/rest/user'
import { BXRestNavvyElapsedItem } from '../elapseditem'
import { iBatchRequestAnswer } from '../../../typification/rest/batch/batchRequestParam'
import { instanceOfiBXRestAnswerSuccess } from '../../../functions/mapResult'

interface BatchValues<T> {
  result: Record<string, T | undefined>
  total: Record<string, number | undefined>
}

/** Результаты и `total` команд из ответов batch по ключам команд. Команды с ошибкой пропускаются */
function batchValues<T>(answers: iBatchRequestAnswer<T>[] | undefined): BatchValues<T> {
  const values: BatchValues<T> = { result: {}, total: {} }
  for (const answer of answers ?? []) {
    if (instanceOfiBXRestAnswerSuccess(answer) && answer.result && typeof answer.result === 'object') {
      const batch = answer.result as { result?: Record<string, T>, result_total?: Record<string, number> }
      Object.assign(values.result, batch.result)
      Object.assign(values.total, batch.result_total)
    }
  }
  return values
}

export class BXRestNavvyOperationElapsedItem {

  private readonly http = new HttpBXServices()
  private readonly delegate = new BXRestNavvyDelegateElapsedItem()
  private readonly BXRestNavvyUser = new BXRestNavvyUser()
  private readonly BXRestNavvyTasks = new BXRestNavvyTasks()

  constructor(private BXRestNavvyElapsedItem: BXRestNavvyElapsedItem) {
  }

  /**
   * Возвращает записи о затраченном времени пользователей за период
   */
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

  /**
   * Возвращает все записи о затраченном времени по задачам `ids`: сначала записи первой задачи,
   * затем второй и так далее.
   *
   * Портал отдаёт не больше 50 записей на страницу. Первые страницы всех задач уходят одним
   * batch, остальные страницы запрашиваются только у задач, где записей больше 50
   */
  getListByIDTask(ids: number[]) {
    // Пустой batch завершается без значения, и вызывающий код получил бы EmptyError
    if (!ids.length) {
      return of([])
    }
    const pageSize = PAGE_SIZE
    const key = (index: number, page: number) => `${index}_${page}`
    const commands = (pages: { index: number, page: number }[]) => Object.fromEntries(pages.map(({ index, page }) => [
      key(index, page),
      {
        name: this.http.getNameMethod([$task, $elapseditem, $getlist]),
        param: { TASKID: ids[index], PARAMS: { NAV_PARAMS: { nPageSize: pageSize, iNumPage: page } } }
      }
    ]))
    const load = (pages: { index: number, page: number }[]): Observable<BatchValues<iBXRestTaskElapsedItemHttp[]>> => pages.length
      ? this.http.branch<iBXRestParamElapseditemGet, iBXRestTaskElapsedItemHttp[]>(commands(pages)).pipe(map(v => batchValues(v)))
      : of({ result: {}, total: {} })

    return load(ids.map((_, index) => ({ index, page: 1 }))).pipe(
      mergeMap(first => {
        const rest = ids.flatMap((_, index) => {
          const pages = Math.ceil((Number(first.total[key(index, 1)]) || 0) / pageSize)
          return Array.from({ length: Math.max(pages - 1, 0) }, (_, i) => ({ index, page: i + 2 }))
        })
        return load(rest).pipe(map(more => ({ ...first.result, ...more.result })))
      }),
      map(result => {
        const items = ids.flatMap((_, index) => {
          const list: iBXRestTaskElapsedItemHttp[] = []
          for (let page = 1; result[key(index, page)]; page++) {
            list.push(...result[key(index, page)]!)
          }
          return list
        })
        return BXRestMapTaskElapsedItem.getList(items)
      })
    )
  }

  /**
   * Проверяет право на добавление затраченного времени сразу по нескольким задачам
   */
  checkPermissionAddElapsedTimeToTaskArr(tasks: number[], userCurrent: iBXRestUser | undefined = undefined) {
    // Убираем дубли, чтобы не проверять права по одной задаче несколько раз.
    const ids = [...new Set(tasks.filter(i => !!i))]
    // Если текущий пользователь не передан снаружи, запрашиваем его один раз на весь набор задач.
    const user$ = userCurrent ? of(userCurrent) : this.BXRestNavvyUser.current().res()

    // Старый batch через task.elapseditem.isactionallowed.
    // Вызываем его ниже только для задач, по которым getaccess не вернул ELAPSEDTIME.ADD.
    const loadMissingByActionAllowed = (missingIds: number[], resolved: { id: number, value: boolean }[]) => {
      return this.http.branch<iIsActionAllowedParam, boolean>(
        Object.assign({}, ...missingIds.map(i => {
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
            const loaded = Object.entries(res).map(([key, value]) => {
              return {id: Number(key), value}
            })

            return [...resolved, ...loaded]
          }

          return undefined
        })
      )
    }

    if (!ids.length) {
      return of([])
    }

    return user$.pipe(
      take(1),
      mergeMap(self => {
        if (!self) {
          // Страховочная ветка: если user.current не вернулся, getaccess вызвать нельзя.
          return loadMissingByActionAllowed(ids, [])
        }

        // Основной путь: одним batch-запросом получаем права ELAPSEDTIME.ADD по всем задачам.
        return this.http.branch<iBXRestParamTaskGetAccess, iBXRestTaskGetAccess>(
          Object.assign({}, ...ids.map(id => {
            return {
              [id]: {
                name: this.http.getNameMethod([$tasks, $task, $getaccess]),
                param: {
                  id,
                  users: [self.ID]
                }
              }
            }
          }))
        ).pipe(
          mergeMap(v => {
            if (v && v.length) {
              const res = this.http.mapBranchResult<iBXRestTaskGetAccess>(v)
              const permissions = ids.map(id => ({
                id,
                value: res[id]?.allowedActions?.[self.ID]?.['ELAPSEDTIME.ADD']
              }))

              // getaccess может вернуть true или false - оба значения считаем готовым ответом.
              // В старый isactionallowed отправляем только задачи без явного ELAPSEDTIME.ADD.
              const resolved = permissions.filter(i => i.value !== undefined) as { id: number, value: boolean }[]
              const missingIds = permissions.filter(i => i.value === undefined).map(i => i.id)

              if (missingIds.length) {
                return loadMissingByActionAllowed(missingIds, resolved)
              }

              return of(permissions)
            }

            // Если batch getaccess не вернулся, сохраняем поведение старого fallback.
            return loadMissingByActionAllowed(ids, [])
          })
        )
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
    return ((userCurrent) ? of(userCurrent) : this.BXRestNavvyUser.current().res()).pipe(
      mergeMap(self => {
        if (self) {
          return this.BXRestNavvyTasks.task.getAccess(
            {
              id: idTask,
              users: [self.ID]
            }).res().pipe(
            map(v => {
              return (v && v[self.ID]) ? v[self.ID]['ELAPSEDTIME.ADD'] : false
            }),
          )
        }
        return of(undefined)
      })
    )
  }

  /**
   * Проверка на возможность прочтения такски
   *
   * @param idTask
   * @param userCurrent
   */
  checkPermissionReadTask(idTask: number, userCurrent: iBXRestUser | undefined = undefined) {
    return ((userCurrent) ? of(userCurrent) : this.BXRestNavvyUser.current().res()).pipe(
      mergeMap(self => {
        if (self) {
          return this.BXRestNavvyTasks.task.getAccess(
            {
              id: idTask,
              users: [self.ID]
            }).res().pipe(
            map(v => {
              return (v && v[self.ID]) ? !!v[self.ID] : false // отдельного флага на чтение нет, выходит что если права отдались то и права есть
            }),
          )
        }
        return of(undefined)
      })
    )
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
                return throwError(() => new Error('No permission to add an elapsed time record to the task'))
              }
            }))
        } else {
          return throwError(() => new Error('No permission to read the task'))
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
              return throwError(() => new Error('No permission to update the elapsed time record'))
            }))
        }
        return throwError(() => new Error('No permission to read the task'))
      }))
  }

  /**
   * Проверяет право на изменение записи о затраченном времени
   */
  isAllowedModify(idTask: number, idItem: number) {
    return this.BXRestNavvyElapsedItem.isActionAllowed({
      TASKID: idTask,
      ITEMID: idItem,
      ACTIONID: 2
    }).res()
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
        return throwError(() => new Error('No permission to read the task'))
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
                return throwError(() => new Error('No permission to delete the elapsed time record'))
              }
            }))
        } else {
          return throwError(() => new Error('No permission to read the task'))
        }
      })
    )
  }

  /**
   * Проверяет право на удаление записи о затраченном времени
   */
  private isAllowedRemove(idTask: number, idItem: number) {
    return this.isActionAllowed(
      {
        TASKID: idTask,
        ITEMID: idItem,
        ACTIONID: 3
      })
  }
}
