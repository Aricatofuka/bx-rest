import { BXRestNavvyLists } from './lists'
import { forkJoin, mergeMap, Observable, of, throwError } from 'rxjs'
import { BXRestNavvyBizProcTask } from './bizproc/task'
import { BXRestNavvyBXRestBizProcWorkflow } from './bizproc/workflow'
import { BXRestNavvyBizProcActivity } from './bizproc/activity'
import { BXRestNavvyBizProcEvent } from './bizproc/event'
import { BXRestNavvyBizProcRobot } from './bizproc/robot'

/** Бизнес-процессы, задания, действия и роботы (`bizproc.*`). */
export class BXRestNavvyBizProc {
  /** Задания бизнес-процессов. */
  public readonly task = new BXRestNavvyBizProcTask()
  /** Запущенные бизнес-процессы и их шаблоны. */
  public readonly workflow = new BXRestNavvyBXRestBizProcWorkflow()
  /** Действия бизнес-процессов, зарегистрированные приложением. */
  public readonly activity = new BXRestNavvyBizProcActivity()
  /** Роботы, зарегистрированные приложением. */
  public readonly robot = new BXRestNavvyBizProcRobot()
  /** Возврат результатов действиям и роботам. */
  public readonly event = new BXRestNavvyBizProcEvent()
  private readonly BXRestNavvyLists = new BXRestNavvyLists()

  /**
   * Метод по запуску бизнес процессов из ленты
   * TODO: продумать работу с такими методами-исключениями
   *
   * templateIDs - id бизнес процессов которые хотим принудительно запустить
   * @param id
   * @param parametersElement
   * @param parametersBizProc
   * @param templateIDs
   */
  startProcFormNewsFeed(
    id: number,
    parametersElement: Record<string, string | Date>,
    parametersBizProc: Record<string, string>,
    templateIDs: number[] = []
  ) {
    // Не понимаю почему DATE_CREATE указывается не на сервере
    // но если пользователь не указал, надо указать
    const value: any = parametersElement['DATE_CREATE']
    if (value === null || value === undefined || (typeof value === 'string' || value.trim() === '')) {
      parametersElement['DATE_CREATE'] = new Date()
    }

    return this.BXRestNavvyLists.element.add(
        {
          IBLOCK_TYPE_ID: 'bitrix_processes',
          IBLOCK_ID: id,
          ELEMENT_CODE: 'trace_studio_' + Date.now() + '_' + Math.random(),
          // тут должно быть уникально значение (генерация уникальных значений на фронте лол),
          // как ещё уникальнее сделать я просто не знаю
          // это поле обязательно без него не работает
          FIELDS: {
            NAME: String(parametersElement['NAME']),
            ...parametersElement
          }
        }
      ).res().pipe(
        mergeMap(v => {
          if (v) {
            if (Object.keys(parametersBizProc).length && templateIDs.length) {
              let request: Observable<any | undefined>[] = []
              for (let templateID of templateIDs) {
                request.push(this.workflow.start(
                  {
                    TEMPLATE_ID: templateID,
                    DOCUMENT_ID: ['lists', 'BizprocDocument', String(v)],
                    PARAMETERS: parametersBizProc
                  }).res())
              }
              return forkJoin(request)
            } else {
              return of(true)
            }
          }
          return throwError(() => new Error('Не удалось запустить бизнес процесс'))
        })
      )
  }
}
