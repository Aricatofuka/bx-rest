import { Navvy } from '../../../services/navvy'
import { iBXRestImObject, iBXRestParamImSearchLastDialog, iBXRestParamImSearchLastGet } from '../../../typification/rest/im'
import { $add, $delete, $get, $im, $last, $search } from '../../../consts/part-name-methods'

export class BXRestNavvyImSearchLast {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет запрос в историю поиска.
   */
  add(param: iBXRestParamImSearchLastDialog) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImSearchLastDialog>(
      [$im, $search, $last, $add],
      param
    )
  }

  /**
   * Удаляет запрос из истории поиска.
   */
  delete(param: iBXRestParamImSearchLastDialog) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamImSearchLastDialog>(
      [$im, $search, $last, $delete],
      param
    )
  }

  /**
   * Возвращает историю поиска.
   */
  get(param: iBXRestParamImSearchLastGet = {}) {
    return this.Navvy.simple<
      iBXRestImObject[],
      iBXRestImObject[],
      iBXRestParamImSearchLastGet
    >([$im, $search, $last, $get], param)
  }
}

