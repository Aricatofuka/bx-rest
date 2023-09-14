import { Injectable } from '@angular/core'
import { BXRestNavvyLists } from './lists'
import { forkJoin, mergeMap, Observable, of } from 'rxjs'
import { BXRestNavvyBizprocWorkflow } from './bizproc/workflow'


@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyBizproc {

  constructor(
    public workflow: BXRestNavvyBizprocWorkflow,
    private BXRestNavvyLists: BXRestNavvyLists
  ) {
  }

  /**
   * Метод по запуску бизнес процессов из ленты
   *
   * @param id
   * @param parametersElement
   * @param parametersBizproc
   * @param templateIDs
   */
  startProcFormNewsFeed(
    id: number,
    parametersElement: { [key: string]: string },
    parametersBizproc: { [key: string]: string },
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
    ).pipe(
      mergeMap(v => {
        if (v) {
          if (Object.keys(parametersBizproc).length) {
            let reques: Observable<string | undefined>[] = []
            for (let templateID of templateIDs) {
              reques.push(this.workflow.start(
                {
                  TEMPLATE_ID: templateID,
                  DOCUMENT_ID: ['lists', 'BizprocDocument', String(v)],
                  PARAMETERS: parametersBizproc
                }))
            }
            return forkJoin(reques)
          } else {
            return of(true)
          }
        }

        return of(false)
      })
    )
  }
}
