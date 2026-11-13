import { Navvy } from '../../../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../../../typification/rest/common'
import { $b2e, $company, $list, $provider, $sign } from '../../../../consts/part-name-methods'
import { isFullPage, offsetNav } from '../../../../services/navvy/sequential-navs'
import { SIGN_PROVIDER_MAX_PAGE_SIZE, SIGN_PROVIDER_PAGE_SIZE } from '../../../../consts/page-size'

export class BXRestNavvySignB2ECompanyProvider  {
  private readonly Navvy = new Navvy()

  /**
   * Возвращает список провайдеров подписи компании
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.pagNavSequential<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >(
      [$sign, $b2e, $company, $provider, $list],
      param,
      offsetNav({ offset: 'offset', limit: 'limit', pageSize: SIGN_PROVIDER_PAGE_SIZE, maxPageSize: SIGN_PROVIDER_MAX_PAGE_SIZE }, isFullPage)
    )
  }
}
