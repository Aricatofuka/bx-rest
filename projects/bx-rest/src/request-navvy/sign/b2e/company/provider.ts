import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $b2e, $company, $list, $provider, $sign } from '../../../../consts/part-name-methods'

export class BXRestNavvySignB2ECompanyProvider  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список провайдеров подписи компании.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sign, $b2e, $company, $provider, $list], param)
  }
}

