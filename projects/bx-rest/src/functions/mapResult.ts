import iHttpAnswerBX from '../typification/rest/base/httpAnswerBX'

export function mapResult<T>(v: iHttpAnswerBX<T> | undefined) {
  if (v && (v.result || typeof v.result === 'boolean')) {
    return v.result
  }
  return undefined
}
