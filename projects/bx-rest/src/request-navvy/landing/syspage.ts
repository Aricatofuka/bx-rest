import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $deleteForLanding, $deleteForSite, $get, $getSpecialPage, $landing, $set, $syspage } from '../../consts/part-name-methods'

export class BXRestNavvyLandingSysPage  {
  private readonly Navvy = new Navvy()

  public deleteForLanding(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $deleteForLanding], param)
  }
  public deleteForSite(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $deleteForSite], param)
  }
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $get], param)
  }
  public getSpecialPage(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $getSpecialPage], param)
  }
  public set(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$landing, $syspage, $set], param)
  }
}

