import { Navvy } from '../../services/navvy'
import { $add, $contact, $crm, $delete, $get, $list, $update } from '../../consts/part-name-methods'
import {
  iBXRestParamCrmContactAdd,
  iBXRestParamCrmContactGet,
  iBXRestParamCrmContactList,
  iBXRestParamCrmContactUpdate,
  iBXRestParamCrmContactDelete
} from '../../typification/rest/crm'
import { BXRestMapCrmContact } from '../../map/crm'

export class BXRestNavvyCrmContact {
  url = {
    /**
     * Создает новый контакт
     */
    add: [$crm, $contact, $add],
    /**
     * Возвращает контакт по идентификатору
     */
    get: [$crm, $contact, $get],
    /**
     * Возвращает список контактов
     */
    list: [$crm, $contact, $list],
    /**
     * Обновляет существующий контакт
     */
    update: [$crm, $contact, $update],
    /**
     * Удаляет контакт
     */
    delete: [$crm, $contact, $delete],
    /**
     * Возвращает описание полей контакта
     */
    fields: [$crm, $contact, 'fields']
  }

  private Navvy = new Navvy()

  /**
   * Создает новый контакт
   * @param param
   */
  add(param: iBXRestParamCrmContactAdd) {
    return this.Navvy.simple<number, number, iBXRestParamCrmContactAdd>(this.url.add, param)
  }

  /**
   * Возвращает контакт по идентификатору
   * @param param
   */
  get(param: iBXRestParamCrmContactGet) {
    return this.Navvy.simple(
      this.url.get,
      param,
      BXRestMapCrmContact.get
    )
  }

  /**
   * Возвращает список контактов
   * @param param
   */
  list(param: iBXRestParamCrmContactList) {
    return this.Navvy.pagNav(
      this.url.list,
      param,
      BXRestMapCrmContact.list
    )
  }

  /**
   * Обновляет существующий контакт
   * @param param
   */
  update(param: iBXRestParamCrmContactUpdate) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmContactUpdate>(this.url.update, param)
  }

  /**
   * Удаляет контакт
   * @param param
   */
  delete(param: iBXRestParamCrmContactDelete) {
    return this.Navvy.simple<boolean, boolean, iBXRestParamCrmContactDelete>(this.url.delete, param)
  }

  /**
   * Возвращает описание полей контакта
   */
  fields() {
    return this.Navvy.simple<Record<string, any>, Record<string, any>, undefined>(this.url.fields)
  }
}

