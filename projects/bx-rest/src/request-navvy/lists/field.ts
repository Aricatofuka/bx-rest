import { inject, Injectable } from '@angular/core'
import BXRestListsField from '../../request/lists/field'
import { iBXRestParamListField } from '../../typification/rest/lists/field/get'
import { Navvy } from '../../services/navvy'
import { BXRestMapListsField } from '../../map/lists/field'

@Injectable({
  providedIn: 'root'
})
export default class BXRestNavvyListsField {
  private readonly BXRestListsField = inject(BXRestListsField)
  private readonly BXRestMapListsField = inject(BXRestMapListsField)

  private Navvy = new Navvy(this.BXRestListsField, this.BXRestMapListsField)

  get(param: iBXRestParamListField) {
    return this.Navvy.PagNavWithUselessKey(
      this.BXRestListsField.get,
      param,
      this.BXRestMapListsField.get
    )
  }
}
