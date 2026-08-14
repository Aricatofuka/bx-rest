import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsByType, $list, $sale, $shipmentProperty, $update } from '../../consts/part-name-methods'

export class BXRestNavvySaleShipmentProperty  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет свойство отгрузки.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentProperty, $add], param)
  }
  /**
   * Удаляет свойство отгрузки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentProperty, $delete], param)
  }
  /**
   * Возвращает свойство отгрузки по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentProperty, $get], param)
  }
  /**
   * Возвращает описание полей свойства отгрузки для указанного типа.
   */
  public getFieldsByType(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentProperty, $getFieldsByType], param)
  }
  /**
   * Возвращает список свойств отгрузки.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentProperty, $list], param)
  }
  /**
   * Обновляет свойство отгрузки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentProperty, $update], param)
  }
}

