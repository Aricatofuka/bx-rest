import { iBXRestPagination } from '../../typification/rest/base/api-pagination-bx'
import { catchError, map } from 'rxjs/operators'
import { concatMap, from, mergeMap, of, throwError, toArray } from 'rxjs'
import clone from 'just-clone'
import { instanceOfiBXRestAnswerSuccess } from '../../functions/mapResult'
import { NavvyPagBase } from './extends/navvy-pag-base'
import { ReturnTypeNavvy } from './navvy-support'
import * as qs from 'qs'
import { BXRest } from '../../rest/base'

export class NavvyPagNavWithUselessKey<T, R, P extends iBXRestPagination> extends NavvyPagBase<Record<string, T>, R[], P> {

  save: ReturnTypeNavvy<Record<string, T>, R[]> = []

  resAll() {
    let BXRestClass = new BXRest()
    return this.resVanilla().pipe(
      mergeMap(
        items => {
          if (items && instanceOfiBXRestAnswerSuccess(items)) {
            if (items.total && items.next) {
              const count = [...Array(Math.floor(items.total / this.pageSize)).keys()]

              // Разделяем массив на блоки
              const chunks = []

              for (let i = 0; i < count.length; i += this.pageSize) {
                chunks.push(count.slice(i, i + this.pageSize))
              }

              const batchRequests = chunks.map(chunk => {
                return BXRestClass.batch<Record<string, T>[]>({
                  halt: 1,
                  cmd: chunk.map(i => {
                    const param = clone(this.param)
                    // Устанавливаем start в зависимости от индекса
                    param.start = (i + 1) * this.pageSize

                    // Формируем строку запроса
                    return this.http.getNameMethod(this.url)
                      + '?' + qs.stringify(param, { arrayFormat: 'brackets' })
                  })
                }).pipe(
                  map(v => {
                    if (v && instanceOfiBXRestAnswerSuccess(v) && v.result && v.result.result && items.result) {
                      return Object.assign({}, items.result, v.result.result) as Record<string, T>
                    }

                    throw new Error('wrong batch')
                  })
                )
              })

              return from(batchRequests).pipe(
                concatMap(request => request), // Выполняет запросы по очереди
                toArray()) // Собирает все результаты в массив
              /*
              return this.getAllTaskElapsedItem(func, param).pipe(
                map(vEnd => {
                  if (vEnd && vEnd.result && items.result) {
                    return merge(clone(vEnd), {result: [...items.result, ...vEnd.result]})
                  }
                  return items
                })
              )
               */
            } else {
              return of([items.result as Record<string, T>])
            }
          }
          return of(undefined)
          // return from([BXRestMapResult(items)])
          // as ReturnType<Observable<T | undefined>, Observable<R | undefined>>
        }
      ),
      map(v => {
        if (v) {
          const mergedObject: Record<string, T> = v.reduce((acc, obj) => {
            return { ...acc, ...obj }
          }, {})

          if(this.map){
            return this.map(mergedObject)
          }
          this.save.push(...v as ReturnTypeNavvy<Record<string, T>, R[]>)
          return this.save
        }
        return v
      }),
      catchError(err => {
        // this.snackBar.error("Проблемы с поточным получение затреканого времени")
        console.error(err)
        return throwError(() => err)
      })
    )
  }
}
