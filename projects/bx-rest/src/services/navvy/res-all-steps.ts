import { filter, map, Observable } from 'rxjs'
import { BXRestResAllDone, BXRestResAllEvent } from './res-all-event'

/**
 * Шаг обхода `.resAll()` после HTTP-ответа. Записи ответа здесь — функция: маппер к ним
 * применяется, только если их ждёт `.resAllWithProgress()`. Самому `.resAll()` хватает итога.
 */
export interface ResAllProgressStep<R> {
  type: 'progress'
  loaded: number
  total: number | undefined
  items: () => R
}

/** Шаг обхода `.resAll()`: после каждого HTTP-ответа и итог в конце. */
export type ResAllStep<R> = ResAllProgressStep<R> | BXRestResAllDone<R>

/** Итог обхода — то, что отдаёт `.resAll()` */
export function resAllResult<R>(steps: Observable<ResAllStep<R>>): Observable<R> {
  return steps.pipe(
    filter((step): step is BXRestResAllDone<R> => step.type === 'done'),
    map(step => step.result)
  )
}

/** События `.resAllWithProgress()` из шагов обхода */
export function resAllEvents<R>(steps: Observable<ResAllStep<R>>): Observable<BXRestResAllEvent<R>> {
  return steps.pipe(
    map((step): BXRestResAllEvent<R> => (step.type === 'done'
      ? step
      : { type: 'progress', loaded: step.loaded, total: step.total, items: step.items() }))
  )
}

/**
 * Сколько записей отдаст обход: `total` из ответа Bitrix без `skipped` записей до начала запроса.
 * `undefined`, если в ответе нет `total`
 */
export function resAllTotal(total: unknown, skipped: number): number | undefined {
  const value = Number(total)
  return (total === undefined || total === null || !Number.isFinite(value))
    ? undefined
    : Math.max(value - skipped, 0)
}
