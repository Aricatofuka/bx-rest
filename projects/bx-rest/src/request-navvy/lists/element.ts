import { iBXRestParamListsElementGet } from '../../typification/rest/lists/element/get'
import { inject, Injectable } from '@angular/core'
import { BXRestListsElement } from '../../request/lists/element'
import BXRestListsElementMap from '../../map/lists/element'
import { iBXRestParamListsElementAdd } from '../../typification/rest/lists/element/add'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyListsElement {

  private readonly BXRestListsElement = inject(BXRestListsElement)
  private readonly BXRestMap = inject(BXRestListsElementMap)
  private Navvy = new Navvy(this.BXRestListsElement, this.BXRestMap)

  get(param: iBXRestParamListsElementGet) {
    return this.Navvy.PagNav(
      this.BXRestListsElement.get,
      param,
      this.BXRestMap.get
    )
  }

  add(param: iBXRestParamListsElementAdd) {
    return this.Navvy.simpleWithArg(this.BXRestListsElement.add, param)
  }
}
