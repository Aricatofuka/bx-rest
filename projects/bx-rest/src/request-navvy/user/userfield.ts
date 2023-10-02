import { Injectable } from '@angular/core'
import { Navvy } from '../../services/navvy'
import { BXRestUserUserfield } from '../../request/user/userfield'

@Injectable({
  providedIn: 'root'
})
export class BXRestNavvyUserUserfield {

  Navvy: Navvy<BXRestUserUserfield, undefined>

  constructor(
    private BXRestUserUserfield: BXRestUserUserfield
  ) {
    this.Navvy = new Navvy(this.BXRestUserUserfield, undefined)
  }

  list() {
    return this.Navvy.simple(this.BXRestUserUserfield.list, 'Не удалось получить список кастомных полей')
  }
}
