import { Navvy } from '../../services/navvy'
import { iBXRestParamTimemanNetworkRangeCheck, iBXRestParamTimemanNetworkRangeSet, iBXRestTimemanNetworkRange, iBXRestTimemanObject } from '../../typification/rest/timeman'
import { $check, $get, $networkrange, $set, $timeMan } from '../../consts/part-name-methods'

export class BXRestNavvyTimemanNetworkRange {
  private readonly Navvy = new Navvy()
  private readonly url = {
    check: [$timeMan, $networkrange, $check],
    get: [$timeMan, $networkrange, $get],
    set: [$timeMan, $networkrange, $set]
  }

  check(param: iBXRestParamTimemanNetworkRangeCheck = {}) {
    return this.Navvy.simple<
      iBXRestTimemanObject,
      iBXRestTimemanObject,
      iBXRestParamTimemanNetworkRangeCheck
    >(this.url.check, param)
  }

  get() {
    return this.Navvy.simple<iBXRestTimemanNetworkRange[]>(this.url.get)
  }

  set(param: iBXRestParamTimemanNetworkRangeSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTimemanNetworkRangeSet>(
      this.url.set,
      param
    )
  }
}

