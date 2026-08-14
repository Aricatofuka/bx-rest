import { Navvy } from '../services/navvy'
import { iBXRestGenericObject, iBXRestGenericParams } from '../typification/rest/common'
import { $add, $delete, $fields, $get, $list, $mailservice, $update } from '../consts/part-name-methods'

export class BXRestNavvyMailService {
  private readonly Navvy = new Navvy()

  /**
   * Создаёт почтовый сервис.
   */
  add(param: iBXRestGenericParams) {
    return this.Navvy.simple<number, number, iBXRestGenericParams>(
      [$mailservice, $add], param
    )
  }

  /**
   * Удаляет почтовый сервис.
   */
  delete(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$mailservice, $delete], param
    )
  }

  /**
   * Возвращает названия полей почтового сервиса.
   */
  fields() {
    return this.Navvy.simple<iBXRestGenericObject>([$mailservice, $fields])
  }

  /**
   * Возвращает параметры почтового сервиса по идентификатору.
   */
  get(param: iBXRestGenericParams) {
    return this.Navvy.simple<iBXRestGenericObject, iBXRestGenericObject, iBXRestGenericParams>(
      [$mailservice, $get], param
    )
  }

  /**
   * Возвращает список активных почтовых сервисов текущего сайта.
   */
  list(param: iBXRestGenericParams = {}) {
    return this.Navvy.simple<
      iBXRestGenericObject[],
      iBXRestGenericObject[],
      iBXRestGenericParams
    >([$mailservice, $list], param)
  }

  /**
   * Обновляет параметры почтового сервиса.
   */
  update(param: iBXRestGenericParams) {
    return this.Navvy.simple<boolean, boolean, iBXRestGenericParams>(
      [$mailservice, $update], param
    )
  }
}
