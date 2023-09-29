import { iBXRestParamListsElementGet } from '../../typification/rest/lists/element/get'
import { Injectable } from '@angular/core'
import { BXRestListsElement } from '../../request/lists/element'
import BXRestListsElementMap from '../../map/lists/element'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyListsElement {

  private Navvy: Navvy<BXRestListsElement, BXRestListsElementMap>

  constructor(
    private BXRestListsElement: BXRestListsElement,
    private BXRestMap: BXRestListsElementMap,
  ) {
    this.Navvy = new Navvy(this.BXRestListsElement, this.BXRestMap)
  }

  get(param: iBXRestParamListsElementGet) {
    return this.Navvy.PagNav(
      this.BXRestListsElement.get,
      param,
      'Не удалось получить элемент списка',
      this.BXRestMap.get
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return this.Navvy.simpleWithArg(this.BXRestListsElement.add, param, 'Не удалось добавить элемент списка')
  }
}
