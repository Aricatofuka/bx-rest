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
  public readonly delivery = new BXRestNavvyCrmItemDelivery()
  public readonly details = new BXRestNavvyCrmItemDetails()
  public readonly payment = new BXRestNavvyCrmItemPayment()
  public readonly productRow = new BXRestNavvyCrmItemProductRow()

  add(param: iBXRestParamCrmItemFields) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemFields>(
      [$crm, $item, $add], param
    )
  }

  batchImport(param: iBXRestParamCrmItemBatchImport) {
    return this.Navvy.simple<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmItemBatchImport
    >([$crm, $item, $batchImport], param)
  }

  delete(param: iBXRestParamCrmItemId) {
    return this.Navvy.simple<null, null, iBXRestParamCrmItemId>(
      [$crm, $item, $delete], param
    )
  }

  fields(param: iBXRestParamCrmEntityType) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmEntityType>(
      [$crm, $item, $fields], param
    )
  }

  get(param: iBXRestParamCrmItemId) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemId>(
      [$crm, $item, $get], param
    )
  }

  import(param: iBXRestParamCrmItemImport) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemImport>(
      [$crm, $item, $import], param
    )
  }

  list(param: iBXRestParamCrmItemList) {
    return this.Navvy.pagNavResultKey<
      iBXRestCrmObject,
      iBXRestCrmObject,
      iBXRestParamCrmItemList,
      'items'
    >([$crm, $item, $list], param, 'items')
  }

  update(param: iBXRestParamCrmItemUpdate) {
    return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestParamCrmItemUpdate>(
      [$crm, $item, $update], param
    )
  }
}
