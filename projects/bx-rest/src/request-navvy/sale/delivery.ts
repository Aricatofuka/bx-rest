import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $delivery, $getList, $sale, $update } from '../../consts/part-name-methods'
import { BXRestNavvySaleDeliveryConfig } from './delivery/config'
import { BXRestNavvySaleDeliveryExtra } from './delivery/extra'
import { BXRestNavvySaleDeliveryHandler } from './delivery/handler'
import { BXRestNavvySaleDeliveryRequest } from './delivery/request'

export class BXRestNavvySaleDelivery  {
  private readonly Navvy = new Navvy()

  public readonly config = new BXRestNavvySaleDeliveryConfig()
  public readonly extra = new BXRestNavvySaleDeliveryExtra()
  public readonly handler = new BXRestNavvySaleDeliveryHandler()
  public readonly request = new BXRestNavvySaleDeliveryRequest()
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $add], param)
  }
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $delete], param)
  }
  public getList(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $getList], param)
  }
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $delivery, $update], param)
  }
}

