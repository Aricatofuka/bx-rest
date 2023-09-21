import { Injectable } from '@angular/core'
import {
  iBXRestParamSonetGroupGet
} from '../typification/rest/sonet_group/get'
import { map } from 'rxjs/operators'
import { BXRestMapSonetGroup } from '../map/sonet_group'
import { Navvy } from '../services/navvy'
import { BXRestSonetGroup } from '../request/sonet_group'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySonetGroup {

  constructor(
    private BXRestSonetGroup: BXRestSonetGroup,
    private mapSonetGroup: BXRestMapSonetGroup,
    private Navvy: Navvy,
  ) {
  }

  get(param: iBXRestParamSonetGroupGet = {
    filter: {},
    order: {}
  }) {
    return this.Navvy.mapAndSnackBarError(
      this.BXRestSonetGroup.get(param), 'Не удалось список групп').pipe(
      map(v => this.mapSonetGroup.get(v))
    )
  }
}
