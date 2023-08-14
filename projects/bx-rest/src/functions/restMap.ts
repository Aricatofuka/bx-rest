import { map } from 'rxjs/operators'
import { mapResult } from './mapResult'
import { REST_SETTINGS } from '../settings'
import iHttpAnswerBX from '../typification/rest/base/httpAnswerBX'


export function restMap<T>(data: iHttpAnswerBX<T> | undefined, mapHttp: Function) {
  if(data) {
    let operators: Function[] = []
    if (REST_SETTINGS.support.map) {
      operators.push(mapHttp)
    }
    if (REST_SETTINGS.support.result) {
      operators.push(map(mapResult))
    }
    return operators.reduce(function (result, operator) {
      return operator(result);
    }, data);
  } else {
    return undefined
  }
}

const multiplyByTwo = map(mapResult)
