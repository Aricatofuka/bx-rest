import { inject, Injectable } from '@angular/core'
import { Navvy } from '../../services/navvy'
import { BXRestUserUserfield } from '../../request/user/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyUserUserfield {

  private readonly BXRestUserUserfield = inject(BXRestUserUserfield)
  private readonly Navvy = new Navvy(this.BXRestUserUserfield, undefined)

  list() {
    return this.Navvy.simple(this.BXRestUserUserfield.list)
  }
}
