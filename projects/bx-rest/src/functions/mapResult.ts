import { iBXRestAnswer, iBXRestAnswerSuccess } from '../typification/rest/base/answer'

export function BXRestMapResult<T>(v: iBXRestAnswer<T>): NonNullable<T>
export function BXRestMapResult(v: undefined): undefined
export function BXRestMapResult<T>(v: iBXRestAnswer<T> | undefined): T | undefined
export function BXRestMapResult<T>(v: iBXRestAnswer<T> | undefined) {
  if (v && (instanceOfiBXRestAnswerSuccess(v))) {
    return v.result
  }
  return undefined
}
export function instanceOfiBXRestAnswerSuccess<T>(object: any): object is iBXRestAnswerSuccess<T> {
  // Без проверки типа `in` бросает TypeError на строке, числе и null вместо false.
  // Строка приходит, если вместо Bitrix ответил прокси: HTML axios отдаёт текстом
  return typeof object === 'object' && object !== null && 'result' in object
}