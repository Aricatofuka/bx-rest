import { iBXRestParamListsElementGet } from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'
import { BXRestListsElement } from '../../request/lists/element'
import { map } from 'rxjs/operators'
import { BXRestMapResult } from '../../functions/mapResult'
import BXRestListsElementMap from '../../map/lists/element'


@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyListsElement {

  constructor(
    private BXRestListsElement: BXRestListsElement,
    private BXRestMap: BXRestListsElementMap
  ) {
  }

  get(pram: iBXRestParamListsElementGet) {
    return this.BXRestListsElement.get(pram).pipe(
      map(v => (v) ? this.BXRestMap.get(BXRestMapResult(v)) : undefined),
    )
  }

  // add(param: iRestBXParamListsElementAdd) {
  //   return this.http.post<iHttpAnswerBX<number>>(this.url.add, param)
  // }
}
