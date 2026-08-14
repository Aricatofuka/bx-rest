import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsExact, $list, $sale, $shipment, $update } from '../../consts/part-name-methods'

export class BXRestNavvySaleShipment  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет отгрузку.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipment, $add], param)
  }
  /**
   * Удаляет отгрузку.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipment, $delete], param)
  }
  /**
   * Возвращает отгрузку по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipment, $get], param)
  }
  /**
   * Возвращает описание полей отгрузки.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipment, $getFieldsExact], param)
  }
  /**
   * Возвращает список отгрузок.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipment, $list], param)
  }
  /**
   * Обновляет отгрузку.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipment, $update], param)
  }
}

