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

  /**
   * Проверяет, входит ли IP-адрес в диапазоны сетевых адресов офисной сети.
   */
  check(param: iBXRestParamTimemanNetworkRangeCheck = {}) {
    return this.Navvy.simple<
      iBXRestTimemanObject,
      iBXRestTimemanObject,
      iBXRestParamTimemanNetworkRangeCheck
    >(this.url.check, param)
  }

  /**
   * Возвращает диапазоны сетевых адресов офисной сети.
   */
  get() {
    return this.Navvy.simple<iBXRestTimemanNetworkRange[]>(this.url.get)
  }

  /**
   * Устанавливает диапазоны сетевых адресов офисной сети.
   */
  set(param: iBXRestParamTimemanNetworkRangeSet) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamTimemanNetworkRangeSet>(
      this.url.set,
      param
    )
  }
}

