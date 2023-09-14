import { iBXRestParamListsElementGet } from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'
import { BXRestListsElement } from '../../request/lists/element'
import { map } from 'rxjs/operators'
import BXRestListsElementMap from '../../map/lists/element'
import { Navvy } from '../../services/navvy'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyListsElement {

  constructor(
    private BXRestListsElement: BXRestListsElement,
    private BXRestMap: BXRestListsElementMap,
    private Navvy: Navvy,
  ) {
  }

  get(param: iBXRestParamListsElementGet) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestListsElement.get(param),
      'Не удалось получить элемент списка'
    ).pipe(
      map(v => (v) ? this.BXRestMap.get(v) : undefined),
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestListsElement.add(param),
      'Не удалось получить элемент списка'
    )
  }
}
