import { Injectable } from '@angular/core'
import { iBXRestParamTimeManStatus } from '../typification/rest/timeman/status'
import { Navvy } from '../services/navvy'
import { BXRestTimeMan } from '../request/timeman'
import { BXRestMapTimeMan } from '../map/timeman'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTimeMan {

  protected Navvy: Navvy<BXRestTimeMan, BXRestMapTimeMan>

  constructor(
    private BXRestTimeMan: BXRestTimeMan,
    private BXRestMapTimeMan: BXRestMapTimeMan
  ) {
    this.Navvy = new Navvy(BXRestTimeMan, BXRestMapTimeMan)
  }

  status(param: iBXRestParamTimeManStatus | undefined = undefined){
    return this.Navvy.simpleWithArg(
      this.BXRestTimeMan.status,
      param,
      this.BXRestMapTimeMan.status
    )
  }
}

