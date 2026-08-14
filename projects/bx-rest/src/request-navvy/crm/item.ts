import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmObject,
  iBXRestParamCrmEntityType,
  iBXRestParamCrmItemBatchImport,
  iBXRestParamCrmItemFields,
  iBXRestParamCrmItemId,
  iBXRestParamCrmItemImport,
  iBXRestParamCrmItemList,
  iBXRestParamCrmItemUpdate
} from '../../typification/rest/crm'
import { $add, $batchImport, $crm, $delete, $fields, $get, $import, $item, $list, $update } from '../../consts/part-name-methods'
import { BXRestNavvyCrmItemDelivery } from './item/delivery'
import { BXRestNavvyCrmItemDetails } from './item/details'
import { BXRestNavvyCrmItemPayment } from './item/payment'
import { BXRestNavvyCrmItemProductRow } from './item/product/row'

export class BXRestNavvyCrmItem {
  private readonly Navvy = new Navvy()
  /**
   * Доставки элемента CRM (`crm.item.delivery.*`).
   */
  public readonly delivery = new BXRestNavvyCrmItemDelivery()
  /**
   * Карточка элемента CRM (`crm.item.details.*`).
   */
  public readonly details = new BXRestNavvyCrmItemDetails()
  /**
   * Оплаты элементов CRM (`crm.item.payment.*`).
   */
  public readonly payment = new BXRestNavvyCrmItemPayment()
  /**
   * Товарные позиции элемента CRM (`crm.item.productrow.*`).
   */
  public readonly productRow = new BXRestNavvyCrmItemProductRow()

  /**
   * Создаёт элемент CRM.
   */
  add(param: iBXRestParamCrmItemFields) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemFields>(
      [$crm, $item, $add], param
    )
  }

  /**
   * Пакетно импортирует элементы CRM.
   */
  batchImport(param: iBXRestParamCrmItemBatchImport) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmItemBatchImport
    >([$crm, $item, $batchImport], param)
  }

  /**
   * Удаляет элемент CRM.
   */
  delete(param: iBXRestParamCrmItemId) {
    return this.Navvy.simple<null, null, iBXRestParamCrmItemId>(
      [$crm, $item, $delete], param
    )
  }

  /**
   * Возвращает описание полей элемента CRM.
   */
  fields(param: iBXRestParamCrmEntityType) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmEntityType>(
      [$crm, $item, $fields], param
    )
  }

  /**
   * Возвращает данные элемента CRM по идентификатору.
   */
  get(param: iBXRestParamCrmItemId) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemId>(
      [$crm, $item, $get], param
    )
  }

  /**
   * Импортирует элемент CRM.
   */
  import(param: iBXRestParamCrmItemImport) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemImport>(
      [$crm, $item, $import], param
    )
  }

  /**
   * Возвращает список элементов CRM.
   */
  list(param: iBXRestParamCrmItemList) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmItemList,
      'items'
    >([$crm, $item, $list], param, 'items')
  }

  /**
   * Изменяет поля элемента CRM.
   */
  update(param: iBXRestParamCrmItemUpdate) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemUpdate>(
      [$crm, $item, $update], param
    )
  }
}
