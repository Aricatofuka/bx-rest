import { Navvy } from '../services/navvy'
import {
  iBXRestFeatureAvailability,
  iBXRestParamFeatureGet
} from '../typification/rest/common'

/** Проверка доступности возможностей портала (`feature.*`). */
export class BXRestNavvyFeature {
  private readonly Navvy = new Navvy()

  /**
   * Проверяет доступность указанной возможности на текущем портале.
   *
   * Поддерживаемые коды: `rest_offline_extended` и `rest_auth_connector`.
   * В поле `value` сервер возвращает `Y` или `N`.
   */
  get(param: iBXRestParamFeatureGet) {
    return this.Navvy.simple<
      iBXRestFeatureAvailability,
      iBXRestFeatureAvailability,
      iBXRestParamFeatureGet
    >(['feature', 'get'], param)
  }
}
