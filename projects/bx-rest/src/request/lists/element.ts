import { $add, $delete, $element, $file, $get, $lists, $update, $url } from '../../consts/part-name-metods'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { mapResult } from '../../functions/mapResult'
import iHttpAnswerBX from '../../typification/rest/base/httpAnswerBX'
import HttpBXServices from '../../services/http/HttpBX'
import BXRestListsElementMap from '../../map/lists/element'
import { iBXRestHttpListsElement, iBXRestParamListsElementGet } from '../../typification/rest/lists/element/get'

class BXRestListsElementBase {
  url = {
    add: [$lists, $element, $add], // Метод создаёт элемент списка
    delete: [$lists, $element, $delete], // Метод удаляет элемент списка
    get: [$lists, $element, $get], // Метод возвращает список элементов или элемент
    update: [$lists, $element, $update], //	Метод обновляет элемент списка
    getFileUrl: [$lists, $element, $get, $file, $url]  // Метод возвращает путь к файлу
  }

  constructor(
    private http: HttpBXServices,
    private mapResult: BXRestListsElementMap
  ) {
  }

  get(pram: iBXRestParamListsElementGet) {
    return this.http.post<iHttpAnswerBX<iBXRestHttpListsElement[]>>(this.url.get, pram)
      .pipe(
        map(v => (v && v.result)
          ? Object.assign(v, {result: v.result.map(i => this.mapResult.get(i))})
          : undefined
        )
      )
  }

  // add(param: iRestBXParamListsElementAdd) {
  //   return this.http.post<iHttpAnswerBX<number>>(this.url.add, param)
  // }
}

@Injectable({
  providedIn: 'root'
})
export class BXRestListsElement extends new Proxy(BXRestListsElementBase, {
  get(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver)
    console.log('res', res)
    if (res in Observable) {
      let mapRes = new BXRestListsElementMap()
      console.log('res', res)
      return Reflect.get(target, prop, receiver).pipe(
        // @ts-ignore
        map(v => (v && v.result)
          // @ts-ignore
          ? Object.assign(v, {result: v.result.map(i => mapRes.get(i))})
          : undefined
        ),
        // @ts-ignore
        map(v => mapResult(v))
      )
    }
    return res
  }
}) {
}
