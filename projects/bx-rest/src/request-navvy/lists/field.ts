import { Injectable } from '@angular/core'
import BXRestListsField from '../../request/lists/field'
import { iBXRestParamListField } from '../../typification/rest/lists/field/get'
import { map } from 'rxjs/operators'
import { Navvy } from '../../services/navvy'

@Injectable({
  providedIn: 'root'
})
export default class BXRestNavvyListsField {

  constructor(
    private BXRestListsField: BXRestListsField,
    private Navvy: Navvy
  ) {
  }


  get(param: iBXRestParamListField) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestListsField.get(param),
      'Не удалось получить поля списка'
    ).pipe(
      map(v => (v) ? Object.values(v) : undefined),
    )
  }
}
