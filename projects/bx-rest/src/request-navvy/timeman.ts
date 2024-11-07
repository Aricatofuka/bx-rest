import { inject, Injectable } from '@angular/core'
import { iBXRestParamTimeManStatus } from '../typification/rest/timeman/status'
import { Navvy } from '../services/navvy'
import { BXRestTimeMan } from '../request/timeman'
import { BXRestMapTimeMan } from '../map/timeman'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyTimeMan {

  private readonly BXRestTimeMan = inject(BXRestTimeMan)
  private readonly BXRestMapTimeMan = inject(BXRestMapTimeMan)
  protected Navvy = new Navvy(this.BXRestTimeMan, this.BXRestMapTimeMan)

  status(param: iBXRestParamTimeManStatus | undefined = undefined){
    return this.Navvy.simpleWithArg(
      this.BXRestTimeMan.status,
      param,
      this.BXRestMapTimeMan.status
    )
  }
}

