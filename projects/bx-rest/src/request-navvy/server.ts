import { Injectable } from '@angular/core'
import { BXRestServer } from '../request/server'
import { Navvy } from '../services/navvy'
import { BXRestMapServer } from '../map/server'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyServer {

  protected Navvy: Navvy<BXRestServer, BXRestMapServer>

  constructor(
    private BXRestServer: BXRestServer,
    private BXRestMapServer: BXRestMapServer
  ) {
    this.Navvy = new Navvy(BXRestServer, BXRestMapServer)
  }

  time(){
    return this.Navvy.simple(
      this.BXRestServer.time,
      this.BXRestMapServer.time
    )
  }
}
