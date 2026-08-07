import { Navvy } from '../../services/navvy'
import { iBXRestImObject } from '../../typification/rest/im'
import { $get, $im, $revision } from '../../consts/part-name-methods'

export class BXRestNavvyImRevision {
  private readonly Navvy = new Navvy()

  get() {
    return this.Navvy.simple<iBXRestImObject>([$im, $revision, $get])
  }
}

