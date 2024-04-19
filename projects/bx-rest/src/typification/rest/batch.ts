import { iBXRestAnswerSuccessTime } from './base/answer'
import { Navvy } from '../../services/navvy'

export interface iBXRestParamBatch<T> {
  /**
   * Определяет прерывать ли последовательность запросов в случае ошибки.
   */
  halt: 0 | 1
  /**
   * Массив запросов стандартного вида
   */
  cmd: { [K in keyof T]: string }
}

export interface iBXRestNavvyParamBatch<T, C, M> {
  /**
   * Определяет прерывать ли последовательность запросов в случае ошибки
   */
  halt: 0 | 1
  /**
   * Массив запросов стандартного вида
   */
  cmd: iBXRestNavvyParamBatchCMD<C, M>
}

export interface iBXRestNavvyParamBatchCMD<C, M> {
  [key: string]: ReturnType<Navvy<C, M>['simpleWithArg'] | Navvy<C, M>['simple'] | Navvy<C, M>['PagNav'] | Navvy<C, M>['PagNavTasks']>
}

export interface iBXRestBatch<T> {
  result: { [K in keyof T]: T[K] }
  result_error: any[] // TODO: дописать
  result_total: { [K in keyof T]: number }
  result_next: any[] // TODO: дописать
  result_time: { [K in keyof T]: iBXRestAnswerSuccessTime }
}

