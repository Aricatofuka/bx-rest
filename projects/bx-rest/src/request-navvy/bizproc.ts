import { Injectable } from '@angular/core'
import { BXRestNavvyLists } from './lists'
import { forkJoin, mergeMap, Observable, of, throwError } from 'rxjs'
import { BXRestNavvyBXRestBizProcWorkflow } from './bizproc/workflow'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyBizProc {

  constructor(
    public workflow: BXRestNavvyBXRestBizProcWorkflow,
    private BXRestNavvyLists: BXRestNavvyLists
  ) {
  }

  /**
   * Метод по запуску бизнес процессов из ленты
   * TODO: продумать работу с такими методами-исключениями
   *
   * @param id
   * @param parametersElement
   * @param parametersBizProc
   * @param templateIDs
   */
  startProcFormNewsFeed(
    id: number,
    parametersElement: { [key: string]: string },
    parametersBizProc: { [key: string]: string },
    templateIDs: number[]
  ) {
    return this.BXRestNavvyLists.element.add(
        {
          IBLOCK_TYPE_ID: 'bitrix_processes',
          IBLOCK_ID: id,
          ELEMENT_CODE: 'trace_studio_' + Date.now() + '_' + Math.random(),
          // тут должно быть уникально значение (генерация уникальных значений на фронте лол),
          // как ещё уникальнее сделать я просто не знаю
          // это поле обязательно без него не работает
          FIELDS: {
            NAME: parametersElement['NAME'],
            ...parametersElement
          }
        }
      ).result().pipe(
        mergeMap(v => {
          if (v) {
            if (Object.keys(parametersBizProc).length) {
              let reques: Observable<string | undefined>[] = []
              for (let templateID of templateIDs) {
                reques.push(this.workflow.start(
                  {
                    TEMPLATE_ID: templateID,
                    DOCUMENT_ID: ['lists', 'BizprocDocument', String(v)],
                    PARAMETERS: parametersBizProc
                  }).result())
              }
              return forkJoin(reques)
            } else {
              return of(true)
            }
          }
          return throwError(() => new Error('Не удалось запустить бизнес процесс'))
        })
      )
  }
}
