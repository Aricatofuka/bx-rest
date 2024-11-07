import { inject, Injectable } from '@angular/core'
import { iBXRestParamSonetGroupGet } from '../typification/rest/sonet_group/get'
import { BXRestMapSonetGroup } from '../map/sonet_group'
import { Navvy } from '../services/navvy'
import { BXRestSonetGroup } from '../request/sonet_group'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvySonetGroup {

  private readonly BXRestSonetGroup = inject(BXRestSonetGroup)
  private readonly mapSonetGroup = inject(BXRestMapSonetGroup)
  private readonly Navvy = new Navvy(this.BXRestSonetGroup, this.mapSonetGroup)

  get(param: iBXRestParamSonetGroupGet = {}) {
    return this.Navvy.simpleWithArg(
      this.BXRestSonetGroup.get, param,
      this.mapSonetGroup.get
    )
  }
}


