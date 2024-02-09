import { Injectable } from '@angular/core'
import { BXRestTaskItemUserField } from '../../../request/task/item/userfield'
import { Navvy } from '../../../services/navvy'
import { BXRestMapTaskUserField } from '../../../map/task/item/userfield'
import {
  iBXRestParamTaskItemUserFieldGetlist
} from '../../../typification/rest/task/item/userfield/getlist'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTaskItemUserField {

  protected Navvy: Navvy<BXRestTaskItemUserField, BXRestMapTaskUserField>

  constructor(
    private userField: BXRestTaskItemUserField,
    private map: BXRestMapTaskUserField
  ) {
    this.Navvy = new Navvy(userField, map)
  }

  getList(param: iBXRestParamTaskItemUserFieldGetlist = {}){
    return this.Navvy.PagNav(
      this.userField.getList,
      param,
      this.map.getList
    )
  }
}