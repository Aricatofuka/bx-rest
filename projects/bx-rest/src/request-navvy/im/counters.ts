import { $counters, $get, $im } from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import { iBXRestImCounters } from '../../typification/rest/im'

export class BXRestNavvyImCounters {

  private Navvy = new Navvy()

  get(){
    return this.Navvy.simple<iBXRestImCounters>([$im, $counters, $get])
  }
}