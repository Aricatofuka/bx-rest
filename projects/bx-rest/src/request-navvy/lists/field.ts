import { Injectable } from '@angular/core'
import BXRestListsField from '../../request/lists/field'
import { iBXRestParamListField } from '../../typification/rest/lists/field/get'
import { Navvy } from '../../services/navvy'
import { BXRestMapListsField } from '../../map/lists/field'

@Injectable({
  providedIn: 'root'
})
export default class BXRestNavvyListsField {
  private Navvy: Navvy<BXRestListsField, BXRestMapListsField>

  constructor(
    private BXRestListsField: BXRestListsField,
    private BXRestMapListsField: BXRestMapListsField,
  ) {
    this.Navvy = new Navvy(this.BXRestListsField, this.BXRestMapListsField)
  }

  get(param: iBXRestParamListField) {
    return this.Navvy.PagNavWithUselessKey(
      this.BXRestListsField.get,
      param,
      this.BXRestMapListsField.get
    )
  }
}
