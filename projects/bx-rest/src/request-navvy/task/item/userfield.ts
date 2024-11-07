import { inject, Injectable } from '@angular/core'
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

  private readonly userField = inject(BXRestTaskItemUserField)
  private readonly map = inject(BXRestMapTaskUserField)
  private readonly Navvy = new Navvy(this.userField, this.map)

  getList(param: iBXRestParamTaskItemUserFieldGetlist = {}){
    return this.Navvy.PagNav(
      this.userField.getList,
      param,
      this.map.getList
    )
  }
}