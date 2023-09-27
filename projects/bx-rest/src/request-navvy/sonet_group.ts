import { Injectable } from '@angular/core'
import {
  iBXRestParamSonetGroupGet, iBXRestParamSonetHttp
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
  ) {
  }

  get(param: iBXRestParamSonetGroupGet = {
    filter: {},
    order: {}
  }) {
    return new Navvy(
      this.BXRestSonetGroup.get(param),
      'Не удалось получить рабочую группу',
        v => this.mapSonetGroup.get(v)
    )
  }
}


