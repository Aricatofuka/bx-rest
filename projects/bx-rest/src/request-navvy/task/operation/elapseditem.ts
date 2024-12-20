import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestTaskElapsedItemHttp } from '../../../typification/rest/task/elapseditem/item'
import { $elapseditem, $getlist, $isactionallowed, $task } from '../../../consts/part-name-methods'
import { map, take } from 'rxjs/operators'
import { BXRestMapTaskElapsedItem } from '../../../map/task/elapseditem'
import { forkJoin, mergeMap, Observable, of } from 'rxjs'
import { iIsActionAllowedParam } from '../../../typification/rest/task/elapseditem/isActionAllowedParam'
import { BXRestNavvyUser } from '../../user'
import { BXRestNavvyTasks } from '../../tasks'
import { BXRestNavvyDelegateElapsedItem } from '../delegate/elapseditem'
import { inject, Injectable } from '@angular/core'
import { iBXRestUser } from '../../../typification/rest/user/user';

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyOperationElapsedItem {

  private readonly http = inject(HttpBXServices)
  private readonly delegate = inject(BXRestNavvyDelegateElapsedItem)
  private readonly BXRestMapElapsedItem = inject(BXRestMapTaskElapsedItem)
  private readonly BXRestNavvyUser = inject(BXRestNavvyUser)
  private readonly BXRestNavvyTasks = inject(BXRestNavvyTasks)

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

  getListByIDTask(ids: number[]) {
    return this.http.branch<iBXRestParamElapseditemGet, iBXRestTaskElapsedItemHttp>
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
          const res = this.http.mapBranchResultWithoutKey(v)
          return this.BXRestMapElapsedItem.getList(res)
        }
        return undefined
      })
    )
  }

  checkPermissionAddElapsedTimeToTaskArr(tasks: number[], userCurrent: iBXRestUser | undefined = undefined) {
    let request: { [key: number]: Observable<boolean> } = Object.assign({}, ...tasks.map(i => {
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
                  const res: { [p: number]: boolean } = this.http.mapBranchResult(v)
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
    return ((userCurrent) ? of(userCurrent) : this.BXRestNavvyUser.current().result()).pipe(
      mergeMap(self => {
        if (self) {
          return this.BXRestNavvyTasks.task.getAccess(
            {
              id: idTask,
              users: [self.ID]
            }).result().pipe(
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
    return ((userCurrent) ? of(userCurrent) : this.BXRestNavvyUser.current().result()).pipe(
      mergeMap(self => {
        if (self) {
          return this.BXRestNavvyTasks.task.getAccess(
            {
              id: idTask,
              users: [self.ID]
            }).result().pipe(
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


}
