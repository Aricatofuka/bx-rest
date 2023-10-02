import { Injectable } from '@angular/core'
import { BXRestServer } from '../request/server'
import { Navvy } from '../services/navvy'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyServer {

  protected Navvy: Navvy<BXRestServer, undefined>

  constructor(
    private BXRestServer: BXRestServer,
  ) {
    this.Navvy = new Navvy(this.BXRestServer, undefined)
  }

  time(){
    return this.Navvy.simple(this.BXRestServer.time, 'Не удалось получить время сервера')
  }
}
