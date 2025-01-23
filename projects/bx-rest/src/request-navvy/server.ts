import { Navvy } from '../services/navvy'
import { BXRestMapServer } from '../map/server'
import { $server, $time } from '../consts/part-name-methods'

export class BXRestNavvyServer {

  url = {
    time: [$server, $time]
  }

  private readonly Navvy = new Navvy()

  time() {
    return this.Navvy.simple<string, Date, undefined>(
      this.url.time,
      undefined,
      BXRestMapServer.time
    )
  }
}
