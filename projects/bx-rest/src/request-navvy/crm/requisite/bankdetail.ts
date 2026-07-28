import {
  $add,
  $bankdetail,
  $crm,
  $delete,
  $get,
  $list,
  $requisite,
  $update
} from '../../../consts/part-name-methods'
import { Navvy } from '../../../services/navvy'
import {
  iBXRestCrmRequisiteBankDetail,
  iBXRestCrmRequisiteFieldsDescription,
  iBXRestParamCrmRequisiteBankDetailAdd,
  iBXRestParamCrmRequisiteBankDetailDelete,
  iBXRestParamCrmRequisiteBankDetailGet,
  iBXRestParamCrmRequisiteBankDetailList,
  iBXRestParamCrmRequisiteBankDetailUpdate
} from '../../../typification/rest/crm'

/** Банковские реквизиты (`crm.requisite.bankdetail.*`). */
export class BXRestNavvyCrmRequisiteBankDetail {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $requisite, $bankdetail, $add],
    update: [$crm, $requisite, $bankdetail, $update],
    get: [$crm, $requisite, $bankdetail, $get],
    list: [$crm, $requisite, $bankdetail, $list],
    delete: [$crm, $requisite, $bankdetail, $delete],
    fields: [$crm, $requisite, $bankdetail, 'fields']
  }

  /**
   * Создает банковский реквизит.
   *
   * `ENTITY_ID` — идентификатор родительского реквизита, а набор банковских
   * полей `RQ_*` зависит от `COUNTRY_ID`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/bank-detail/crm-requisite-bank-detail-add.html
   */
  add(param: iBXRestParamCrmRequisiteBankDetailAdd) {
    return this.Navvy.simple<
      number,
      number,
      iBXRestParamCrmRequisiteBankDetailAdd
    >(this.url.add, param)
  }

  /**
   * Изменяет существующий банковский реквизит.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/bank-detail/crm-requisite-bank-detail-update.html
   */
  update(param: iBXRestParamCrmRequisiteBankDetailUpdate) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteBankDetailUpdate
    >(this.url.update, param)
  }

  /**
   * Возвращает банковский реквизит по идентификатору.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/bank-detail/crm-requisite-bank-detail-get.html
   */
  get(param: iBXRestParamCrmRequisiteBankDetailGet) {
    return this.Navvy.simple<
      iBXRestCrmRequisiteBankDetail,
      iBXRestCrmRequisiteBankDetail,
      iBXRestParamCrmRequisiteBankDetailGet
    >(this.url.get, param)
  }

  /**
   * Возвращает банковские реквизиты по фильтру.
   *
   * Поддерживает выборку `select`, сортировку `order` и постраничную навигацию.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/bank-detail/crm-requisite-bank-detail-list.html
   */
  list(param: iBXRestParamCrmRequisiteBankDetailList = {}) {
    return this.Navvy.pagNav<
      iBXRestCrmRequisiteBankDetail,
      iBXRestCrmRequisiteBankDetail,
      iBXRestParamCrmRequisiteBankDetailList
    >(this.url.list, param)
  }

  /**
   * Удаляет банковский реквизит.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/bank-detail/crm-requisite-bank-detail-delete.html
   */
  delete(param: iBXRestParamCrmRequisiteBankDetailDelete) {
    return this.Navvy.simple<
      boolean,
      boolean,
      iBXRestParamCrmRequisiteBankDetailDelete
    >(this.url.delete, param)
  }

  /**
   * Возвращает формальное описание полей банковских реквизитов.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/bank-detail/crm-requisite-bank-detail-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmRequisiteFieldsDescription>(this.url.fields)
  }
}
