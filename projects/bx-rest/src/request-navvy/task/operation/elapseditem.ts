import { iBXRestParamElapseditemGet } from '../../../typification/rest/task/elapseditem/get'
import { HttpBXServices } from '../../../services/http/HttpBX'
import { iBXRestTaskElapsedItem, iBXRestTaskElapsedItemHttp } from '../../../typification/rest/task/elapseditem/item'
import { $elapseditem, $getaccess, $getlist, $task, $tasks } from '../../../consts/part-name-metods'
import { map, take } from 'rxjs/operators'
import { BXRestMapTaskElapseditem } from '../../../map/task/elapseditem'
import { forkJoin, mergeMap, Observable, of, tap } from 'rxjs'
import { iIsActionAllowedParam } from '../../../typification/rest/task/elapseditem/isActionAllowedParam'
import { Permission } from '../../../services/permission'
import { BXRestNavvyUser } from '../../user'
import { BXRestNavvyTasks } from '../../tasks'
import { BXRestNavvyDelegateElapseditem } from '../delegate/elapseditem'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyOperationElapseditem {

  constructor(
    private http: HttpBXServices,
    private delegate: BXRestNavvyDelegateElapseditem,
    private BXRestMapElapseditem: BXRestMapTaskElapseditem,
    private BXRestNavvyUser: BXRestNavvyUser,
    private BXRestNavvyTasks: BXRestNavvyTasks,
  ) {
  }

  getByInterval(idsUsers: number[], dateStart: Date, dateEnd: Date) {
    const param: iBXRestParamElapseditemGet = {
      ORDER: {
        ID: 'DESC'
      },
      FILTER: {
        USER_ID: idsUsers,
        '>=CREATED_DATE': dateStart.toLocaleString('ru-Ru'),
        '<=CREATED_DATE': dateEnd.toLocaleString('ru-Ru'),
      }
    }
    return this.delegate.getList(param)
  }

  getListByIDTask(ids: number[]) {
    return this.http.branch<iBXRestParamElapseditemGet, iBXRestTaskElapsedItemHttp[]>
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
            i => this.BXRestMapElapseditem.getList(i)
          ).filter((i): i is iBXRestTaskElapsedItem[] => i !== undefined).flat()
        }
        return undefined
      })
    )
  }

  checkPermissionAddElapsedtimeToTaskArr(tasks: number[]) {
    let request: { [key: number]: Observable<boolean> } = Object.assign({}, ...tasks.map(i => {
      return {[i]: this.checkPermissionAddElapsedtimeToTask(i)}
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
                      name: this.http.getNameMethod([$tasks, $task, $getaccess]),
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

  checkPermissionAddElapsedtimeToTask(idTask: number) {
    let permission = Permission.get()
    if (permission?.tasks?.length) {
      let findTask = permission.tasks.find(i => i.id === idTask)
      if (findTask?.permission) {
        return of(findTask.permission['ELAPSEDTIME.ADD'])
      }
      return this.BXRestNavvyUser.current().result().pipe(
        mergeMap(self => {
          if (self) {
            return this.BXRestNavvyTasks.task.getaccess(
              {
                id: idTask,
                users: [self.ID]
              }).result().pipe(
              tap(v => {
                if (v && v[self.ID]) {
                  Permission.set({
                    tasks: [{id: idTask, permission: v[self.ID], elapsedItem: []}]
                  })
                }
              }),
              map(v => {
                return (v && v[self.ID]) ? v[self.ID]['ELAPSEDTIME.ADD'] : false
              }),
            )
          }
          return of(undefined)
        })
      )
    }

    return of(undefined)
  }

  checkPermissionReadTask(idTask: number) {
    let permission = Permission.get()
    if (permission?.tasks?.length) {
      let findTask = permission.tasks.find(i => i.id === idTask)
      if (findTask?.permission) {
        return of(findTask.permission.ACCEPT)
      }
      return this.BXRestNavvyUser.current().result().pipe(
        mergeMap(self => {
          if (self) {
            return this.BXRestNavvyTasks.task.getaccess(
              {
                id: idTask,
                users: [self.ID]
              }).result().pipe(
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
}
