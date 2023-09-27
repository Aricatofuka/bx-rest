import { iBXRestParamListsElementGet } from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'
import { BXRestListsElement } from '../../request/lists/element'
import BXRestListsElementMap from '../../map/lists/element'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'
import { NavvyParam } from '../../services/Navvy/NavvyParam'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyListsElement {

  constructor(
    private BXRestListsElement: BXRestListsElement,
    private BXRestMap: BXRestListsElementMap,
  ) {
  }

  get(param: iBXRestParamListsElementGet) {
    return new NavvyParam(
      this.BXRestListsElement.get,
      param,
      'Не удалось получить элемент списка',
      v => (v) ? this.BXRestMap.get(v) : undefined
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return new NavvyParam(this.BXRestListsElement.add, param, 'Не удалось добавить элемент списка')
  }
}
