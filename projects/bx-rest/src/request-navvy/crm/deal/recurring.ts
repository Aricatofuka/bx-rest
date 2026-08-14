import { Navvy } from '../../../services/navvy'
import { iBXRestCrmObject, iBXRestCrmParams } from '../../../typification/rest/crm'
import { $add, $crm, $deal, $delete, $expose, $fields, $get, $list, $recurring, $update } from '../../../consts/part-name-methods'

export class BXRestNavvyCrmDealRecurring {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт шаблон регулярной сделки.
   */
  add(param: iBXRestCrmParams) { return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $deal, $recurring, $add], param) }
  /**
   * Удаляет шаблон регулярной сделки.
   */
  delete(param: iBXRestCrmParams) { return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $recurring, $delete], param) }
  /**
   * Создаёт сделку по шаблону вне расписания.
   */
  expose(param: iBXRestCrmParams) { return this.Navvy.simple<number, number, iBXRestCrmParams>([$crm, $deal, $recurring, $expose], param) }
  /**
   * Возвращает описание полей шаблона регулярной сделки.
   */
  fields() { return this.Navvy.simple<iBXRestCrmObject>([$crm, $deal, $recurring, $fields]) }
  /**
   * Возвращает настройки шаблона регулярной сделки по идентификатору.
   */
  get(param: iBXRestCrmParams) { return this.Navvy.simple<iBXRestCrmObject, iBXRestCrmObject, iBXRestCrmParams>([$crm, $deal, $recurring, $get], param) }
  /**
   * Возвращает список шаблонов регулярных сделок.
   */
  list(param: iBXRestCrmParams = {}) { return this.Navvy.simple<iBXRestCrmObject[], iBXRestCrmObject[], iBXRestCrmParams>([$crm, $deal, $recurring, $list], param) }
  /**
   * Изменяет настройки шаблона регулярной сделки.
   */
  update(param: iBXRestCrmParams) { return this.Navvy.simple<boolean, boolean, iBXRestCrmParams>([$crm, $deal, $recurring, $update], param) }
}
