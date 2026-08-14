import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $delete, $get, $getFieldsExact, $list, $modify, $sale, $shipmentPropertyValue } from '../../consts/part-name-methods'

export class BXRestNavvySaleShipmentPropertyValue  {
  private readonly Navvy = new Navvy()

  /**
   * Удаляет значение свойства отгрузки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentPropertyValue, $delete], param)
  }
  /**
   * Возвращает значение свойства отгрузки по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentPropertyValue, $get], param)
  }
  /**
   * Возвращает описание полей значения свойства отгрузки.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentPropertyValue, $getFieldsExact], param)
  }
  /**
   * Возвращает список значений свойств отгрузки.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentPropertyValue, $list], param)
  }
  /**
   * Устанавливает или изменяет значение свойства отгрузки.
   */
  public modify(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentPropertyValue, $modify], param)
  }
}

