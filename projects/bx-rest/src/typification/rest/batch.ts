import { iBXRestAnswerSuccessTime } from './base/answer'
import { Navvy } from '../../services/navvy'

export interface iBXRestParamBatch {
  /**
   * Определяет прерывать ли последовательность запросов в случае ошибки.
   */
  halt: 0 | 1
  /**
   * Массив запросов стандартного вида
   */
  cmd: Record<number | string, string> | string[]
}
export type iBXRestNavvyParamBatchCMD = Record<string, ReturnType<Navvy['simple'] | Navvy['PagNav'] | Navvy['PagNavTasks']>>;

export interface iBXRestBatch<T> {
  result: { [K in keyof T]: T[K] }
  result_error: any[] // TODO: дописать
  result_total: { [K in keyof T]: number }
  result_next: any[] // TODO: дописать
  result_time: { [K in keyof T]: iBXRestAnswerSuccessTime }
}

