import { Injectable } from '@angular/core'
import { iBXRestParamSonetGroupGet } from '../typification/rest/sonet_group/get'
import { BXRestMapSonetGroup } from '../map/sonet_group'
import { Navvy } from '../services/navvy'
import { BXRestSonetGroup } from '../request/sonet_group'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySonetGroup {

  private Navvy: Navvy<BXRestSonetGroup, BXRestMapSonetGroup>

  constructor(
    private BXRestSonetGroup: BXRestSonetGroup,
    private mapSonetGroup: BXRestMapSonetGroup,
  ) {
    this.Navvy = new Navvy(this.BXRestSonetGroup, this.mapSonetGroup)
  }

  get(param: iBXRestParamSonetGroupGet = {}) {
    return this.Navvy.simpleWithArg(
      this.BXRestSonetGroup.get, param,
      'Не удалось получить рабочую группу',
      this.mapSonetGroup.get
    )
  }
}


