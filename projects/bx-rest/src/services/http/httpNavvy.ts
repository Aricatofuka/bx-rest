import { Observable } from 'rxjs'
import { iBXRestParams } from '../../typification/base/params'
import { iBXRestAnswers } from '../../typification/base/answers'
import { HttpBXServices } from './HttpBX'
import { iBXRestAnswer } from '../../typification/rest/base/answer'

export class HttpNavvyServices {
  private readonly httpServices = new HttpBXServices()

  post<T extends keyof iBXRestParams>(
    url: [T],
    params?: iBXRestParams[T],
  ): Observable<iBXRestAnswer<iBXRestAnswers[T]> | undefined>

  // Перегрузка для пути из двух элементов
  post<T extends keyof iBXRestParams, K1 extends keyof iBXRestParams>(
    url: [T, K1],
    params?: iBXRestParams[T][K1],
  ): Observable<iBXRestAnswer<iBXRestAnswers[T][K1]> | undefined>

  // Перегрузка для пути из трех элементов
  post<T extends keyof iBXRestParams, K1 extends keyof iBXRestParams[T], K2 extends keyof iBXRestParams[T][K1]>(
    url: [T, K1, K2],
    params?: iBXRestParams[T][K1][K2],
  ): Observable<iBXRestAnswer<iBXRestAnswers[T][K1][K2]> | undefined>

  // Реализация метода
  post(url: string[], params?: any): Observable<any | undefined>
  {
    if(params === undefined){
      params = {}
    }
    return this.httpServices.post(url, params)
  }
}