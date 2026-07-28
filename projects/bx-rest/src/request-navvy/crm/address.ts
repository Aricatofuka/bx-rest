import {
  $add,
  $address,
  $crm,
  $delete,
  $list,
  $update
} from '../../consts/part-name-methods'
import { Navvy } from '../../services/navvy'
import {
  iBXRestCrmAddressFields,
  iBXRestCrmRequisiteFieldsDescription,
  iBXRestParamCrmAddressAdd,
  iBXRestParamCrmAddressDelete,
  iBXRestParamCrmAddressList,
  iBXRestParamCrmAddressUpdate
} from '../../typification/rest/crm'

/** Адреса CRM (`crm.address.*`). Адреса реквизитов отображаются в карточках компаний и контактов. */
export class BXRestNavvyCrmAddress {
  private readonly Navvy = new Navvy()
  private readonly url = {
    add: [$crm, $address, $add],
    update: [$crm, $address, $update],
    list: [$crm, $address, $list],
    delete: [$crm, $address, $delete],
    fields: [$crm, $address, 'fields']
  }

  /**
   * Добавляет адрес к реквизиту, лиду или поддерживаемому объекту старого режима.
   *
   * Адрес уникален по сочетанию `TYPE_ID`, `ENTITY_TYPE_ID` и `ENTITY_ID`.
   * Типы адресов возвращает `crm.enum.addresstype`, типы объектов — `crm.enum.ownertype`.
   *
   * @param param Составной ключ адреса и его почтовые поля.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/addresses/crm-address-add.html
   */
  add(param: iBXRestParamCrmAddressAdd) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAddressAdd>(
      this.url.add,
      param
    )
  }

  /**
   * Изменяет адрес, найденный по составному ключу в `fields`.
   *
   * Поля `ANCHOR_TYPE_ID` и `ANCHOR_ID` являются служебными и заполняются автоматически.
   *
   * @param param Ключ адреса и изменяемые значения.
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/addresses/crm-address-update.html
   */
  update(param: iBXRestParamCrmAddressUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAddressUpdate>(
      this.url.update,
      param
    )
  }

  /**
   * Возвращает адреса по фильтру с выборкой полей, сортировкой и пагинацией.
   *
   * Для адресов реквизита обычно фильтруют по `ENTITY_TYPE_ID: 8` и идентификатору
   * реквизита в `ENTITY_ID`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/addresses/crm-address-list.html
   */
  list(param: iBXRestParamCrmAddressList = {}) {
    return this.Navvy.pagNav<
      iBXRestCrmAddressFields,
      iBXRestCrmAddressFields,
      iBXRestParamCrmAddressList
    >(this.url.list, param)
  }

  /**
   * Удаляет адрес по составному ключу `TYPE_ID`, `ENTITY_TYPE_ID`, `ENTITY_ID`.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/addresses/crm-address-delete.html
   */
  delete(param: iBXRestParamCrmAddressDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmAddressDelete>(
      this.url.delete,
      param
    )
  }

  /**
   * Возвращает формальное описание полей адреса.
   *
   * @see https://apidocs.bitrix24.ru/api-reference/crm/requisites/addresses/crm-address-fields.html
   */
  fields() {
    return this.Navvy.simple<iBXRestCrmRequisiteFieldsDescription>(this.url.fields)
  }
}
