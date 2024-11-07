import { inject, Injectable } from '@angular/core'
import { BXRestServer } from '../request/server'
import { Navvy } from '../services/navvy'
import { BXRestMapServer } from '../map/server'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyServer {

  private readonly BXRestServer = inject(BXRestServer)
  private readonly BXRestMapServer = inject(BXRestMapServer)
  private readonly Navvy = new Navvy(this.BXRestServer, this.BXRestMapServer)

  time(){
    return this.Navvy.simple(
      this.BXRestServer.time,
      this.BXRestMapServer.time
    )
  }
}
