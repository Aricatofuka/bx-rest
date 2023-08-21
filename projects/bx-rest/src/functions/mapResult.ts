import { iBXRestAnswer } from '../typification/rest/base/answer'

export function BXRestMapResult<T>(v: iBXRestAnswer<T>): NonNullable<T>
export function BXRestMapResult(v: undefined): undefined
export function BXRestMapResult<T>(v: iBXRestAnswer<T> | undefined): T | undefined
export function BXRestMapResult<T>(v: iBXRestAnswer<T> | undefined) {
  if (v && (v.result || typeof v.result === 'boolean')) {
    return v.result
  }
  return undefined
}
