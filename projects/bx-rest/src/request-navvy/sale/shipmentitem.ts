import { Navvy } from '../../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../../typification/rest/common'
import { $add, $delete, $get, $getFieldsExact, $list, $sale, $shipmentItem, $update } from '../../consts/part-name-methods'

export class BXRestNavvySaleShipmentItem  {
  private readonly Navvy = new Navvy()

  /**
   * Добавляет товарную позицию отгрузки.
   */
  public add(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentItem, $add], param)
  }
  /**
   * Удаляет товарную позицию отгрузки.
   */
  public delete(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentItem, $delete], param)
  }
  /**
   * Возвращает товарную позицию отгрузки по идентификатору.
   */
  public get(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentItem, $get], param)
  }
  /**
   * Возвращает описание полей товарной позиции отгрузки.
   */
  public getFields(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentItem, $getFieldsExact], param)
  }
  /**
   * Возвращает список товарных позиций отгрузки.
   */
  public list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentItem, $list], param)
  }
  /**
   * Обновляет товарную позицию отгрузки.
   */
  public update(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject,
      iBXRestGenericObject,
      iBXRestGenericParams
    >([$sale, $shipmentItem, $update], param)
  }
}

