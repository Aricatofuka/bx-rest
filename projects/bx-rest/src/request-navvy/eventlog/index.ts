import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $eventlog, $get, $list, $main, $tail } from '../../consts/part-name-methods'
import { BXRestNavvyEventLogField } from './field'

export class BXRestNavvyEventLog  {
  private readonly Navvy = new Navvy()

  public readonly field = new BXRestNavvyEventLogField()
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $get], param)
  }
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $list], param)
  }
  public tail(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$main, $eventlog, $tail], param)
  }
}

