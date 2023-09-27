import { Injectable } from '@angular/core'
import BXRestListsField from '../../request/lists/field'
import { iBXRestParamListField } from '../../typification/rest/lists/field/get'
import { NavvyParam } from '../../services/Navvy/NavvyParam'

@Injectable({
  providedIn: 'root'
})
export default class BXRestNavvyListsField {

  constructor(
    private BXRestListsField: BXRestListsField,
  ) {
  }

  get(param: iBXRestParamListField) {
    return new NavvyParam(
      this.BXRestListsField.get, param,
      'Не удалось получить поля списка',
      v => (v) ? Object.values(v) : undefined
    )
  }
}
